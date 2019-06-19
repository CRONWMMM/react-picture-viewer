import React from 'react'
import PropTypes from 'prop-types'
// utils
import { isNaN, isFunction, isEqual } from '../libs/utils'
// style
import './index.css'

class ReactPictureViewer extends React.Component {

    static propTypes = {
        id: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]), // 组件唯一的标识 id
        width: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]), // viewport 视口的宽度
        height: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]), // viewport 视口的高度
        minimum: PropTypes.number, // 缩放的最小尺寸【零点几】
        maximum: PropTypes.number, // 缩放的最大尺寸
        rate: PropTypes.number, // 缩放的速率
        children: PropTypes.object.isRequired, // slot 插槽
        className: PropTypes.string, // className
        center: PropTypes.bool, // 图片位置是否初始居中
        contain: PropTypes.bool // 图片尺寸是否初始包含在视口范围内
    }

    static defaultProps = {
        id: 'viewport',
        width: '600px',
        height: '400px',
        minimum: 0.8,
        maximum: 8,
        rate: 10,
        center: true,
        contain: true
    }

    state = {
        focus: false, // 鼠标是否按下，处于可拖动状态
        imageWidth: 0, // 图片宽度
        imageHeight: 0, // 图片高度
        startX: 0, // 鼠标按下时，距离 viewport 的初始 X 位置
        startY: 0, // 鼠标按下时，距离 viewport 的初始 Y 位置
        startLeft: 0, // 图片距离 viewport 的初始 Left
        startTop: 0, // 图片距离 viewport 的初始 Top
        currentLeft: 0, // 图片当前距离 viewport 的 left
        currentTop: 0, // 图片当前距离 viewport 的 top
        scale: 1 // 图片缩放比率 minimum - maximum
    }

    constructor() {
        super()
        this.viewportDOM = null
        this.imgDOM = null
    }

    componentDidMount() {
        const { id, width, height } = this.props

        this.viewportDOM = document.getElementById(id)
        this.imgDOM = this.viewportDOM.getElementsByTagName('img')[0]

        this.initViewport(width, height)
        // 这边需要将滚轮事件使用原生绑定来处理
        // 从而解决新版本 chrome 浏览器带来的 passive event listener
        // 在对图片进行滚动缩放时无法使用 e.preventDefault 来禁用浏览器滚动问题
        this.imgDOM.addEventListener('wheel', this.handleMouseWheel, { passive: false })

        this.initPicture()
    }

    componentWillReceiveProps(nextProps) {
        // 如果检测到 props 确实有变化，再去重新 init
        const flag = !isEqual(this.props, nextProps, 'children') || !isEqual(this.props.children.props, nextProps.children.props)
        flag && this.initPicture(nextProps)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !isEqual(this.state, nextState) || !isEqual(this.props, nextProps, 'children') || !isEqual(this.props.children.props, nextProps.children.props)
    }

    componentWillUpdate(nextProps, nextState) {
        const { scale, imageWidth: originWidth, imageHeight: originHeight, currentLeft, currentTop } = nextState
        const currentImageWidth = scale * originWidth
        const currentImageHeight = scale * originHeight

        // 改变图片位置
        this.changePosition(currentLeft, currentTop)
        // 改变图片尺寸
        this.changeSize(currentImageWidth, currentImageHeight)
    }

    initViewport = (width, height) => {
        // 如果是字符串，就将字符串作为尺寸设置；否则是数字的话，就在后面加 px 设置
        this.viewportDOM.style.width = isNaN(+width) ? width : `${width}px`
        this.viewportDOM.style.height = isNaN(+height) ? height: `${height}px`
    }

    /**
     * 图片初始化，包括：
     * 1. 初始图片位置居中
     * 2. 记录初始图片尺寸
     * @param nextProps
     */
    initPicture = (nextProps) => {
        nextProps = nextProps || this.props

        const { children: { props: { src } }, center, contain } = nextProps
        const callback = center ? this.changeToCenter : this.changeToBasePoint

        // 这块有个执行顺序
        // 必须是先确定尺寸，再确定位置
        if (contain) {
            this.changeToContain(src, callback)
        } else {
            this._getImageOriginSize(src).then(({ width: imageWidth, height: imageHeight }) => {
                this.setState({
                    scale: 1,
                    imageWidth,
                    imageHeight
                }, callback)
            }).catch(e => {
                console.error(e)
            })
        }
    }

    /**
     * 设置图片尺寸为 contain
     * @param src {String} 需要操作的图片的 src
     * @param callback {Function} changeToContain 完成后的回调函数，接受更新后的图片尺寸，即 imageWidth 和 imageHeight 两个参数
     */
    changeToContain = (src, callback) => {
        src = src || this.props.src
        callback = isFunction(callback) ? callback : () => {}

        this._getImageOriginSize(src).then(({ width: imageOriginWidth, height: imageOriginHeight }) => {
            const { imageWidth, imageHeight } = this.recalcImageSizeToContain(imageOriginWidth, imageOriginHeight)
            this.setState({
                scale: 1,
                imageWidth,
                imageHeight
            }, () => { callback(imageWidth, imageHeight) })
        }).catch(e => {
            console.error(e)
        })
    }

    /**
     * 设置图片位置为 center
     */
    changeToCenter = () => {
        const { imageWidth, imageHeight } = this.state
        const [ viewportDOM ] = [ this.viewportDOM ]
        const [ viewPortWidth, viewPortHeight ] = [ viewportDOM.clientWidth, viewportDOM.clientHeight ]
        // 设置图片默认位置居中
        const [ top, left ] = [ (viewPortHeight - imageHeight) / 2, (viewPortWidth - imageWidth) / 2 ]

        this.setState({
            currentLeft: left,
            currentTop: top,
            startLeft: left,
            startTop: top
        })
    }

    /**
     * 设置图片位置为基准点位置
     * 基准点位置，基于视口: top: 0 && left: 0
     */
    changeToBasePoint = () => {
        this.setState({
            currentLeft: 0,
            currentTop: 0,
            startLeft: 0,
            startTop: 0
        })
    }

    /**
     * 重新计算图片尺寸，使宽高都不会超过视口尺寸
     * @param imageWidth
     * @param imageHeight
     * @returns {*}
     */
    recalcImageSizeToContain = (imageWidth, imageHeight) => {
        const rate = imageWidth / imageHeight
        const viewportDOM = this.viewportDOM
        const [ viewPortWidth, viewPortHeight ] = [ viewportDOM.clientWidth, viewportDOM.clientHeight ]
        if (imageWidth > viewPortWidth) {
            imageWidth = viewPortWidth
            imageHeight = imageWidth / rate
            return this.recalcImageSizeToContain(imageWidth, imageHeight)
        } else if (imageHeight > viewPortHeight) {
            imageHeight = viewPortHeight
            imageWidth = imageHeight * rate
            return this.recalcImageSizeToContain(imageWidth, imageHeight)
        } else {
            return { imageWidth, imageHeight }
        }
    }

    /**
     * 设置图片尺寸为 cover
     */
    changeToCover() {} // eslint-disable-line

    /**
     * 改变图片位置
     * @param currentLeft {Number} 当前 left
     * @param currentTop {Number} 当前 top
     */
    changePosition(currentLeft, currentTop) {
        const imgDOM = this.imgDOM
        imgDOM.style.top = `${currentTop}px`
        imgDOM.style.left = `${currentLeft}px`
    }

    /**
     * 调整尺寸
     * @param width
     * @param height
     */
    changeSize(width, height) {
        const imgDOM = this.imgDOM
        imgDOM.style.maxWidth = imgDOM.style.maxHeight = 'none'
        imgDOM.style.width = `${width}px`
        imgDOM.style.height = `${height}px`
    }

    /**
     * 处理鼠标按下
     * @param e
     */
    handleMouseDown = (e) => {
        const currentDOM = e.target || e.toElement
        if (currentDOM !== this.imgDOM) return

        let { top: startY, left: startX } = this._getOffsetInElement(e, this.viewportDOM)
        this.setState({
            focus: true,
            startX,
            startY
        })
    }

    /**
     * 处理鼠标移动
     * @param e
     */
    handleMouseMove = (e) => {
        const { focus, startX, startY, startTop, startLeft } = this.state
        if (!focus) return

        let { left: currentX, top: currentY } = this._getOffsetInElement(e, this.viewportDOM)
        let [ diffX, diffY ] = [ currentX - startX, currentY - startY ]

        this.setState({
            currentLeft: startLeft + diffX,
            currentTop: startTop + diffY
        })
    }

    /**
     * 处理鼠标放开
     */
    handleMouseUp = () => {
        const { currentLeft, currentTop } = this.state
        this.setState({
            focus: false,
            startX: 0,
            startY: 0,
            startLeft: currentLeft,
            startTop: currentTop
        })
    }

    /**
     * 处理鼠标移出
     */
    handleMouseLeave = () => {
        this.handleMouseUp()
    }

    /**
     * 处理滚轮缩放
     * @param e {Event Object} 事件对象
     */
    handleMouseWheel = (e) => {
        const imgDOM = this.imgDOM
        const { minimum, maximum, rate } = this.props
        const { imageWidth: originWidth, imageHeight: originHeight, currentLeft, currentTop, scale: lastScale } = this.state
        const [ imageWidth, imageHeight ] = [ imgDOM.clientWidth, imgDOM.clientHeight ]
        const event = e.nativeEvent || e
        event.preventDefault()
        // 这块的 scale 每次都需要用 1 去加，作为图片的实时缩放比率
        let scale = 1 + event.wheelDelta / (12000 / rate)

        // 最小缩放至 minimum 就不能再缩小了
        // 最大放大至 maximum 倍就不能再放大了
        if ((lastScale <= minimum && scale < 1) || (lastScale >= maximum && scale > 1)) return

        // 真实的图片缩放比率需要用尺寸相除
        let nextScale = imageWidth * scale / originWidth

        // 进行缩放比率检测
        // 如果小于最小值，使用原始图片尺寸和最小缩放值
        // 如果大于最大值，使用最大图片尺寸和最大缩放值
        nextScale = nextScale <= minimum ? minimum : nextScale >= maximum ? maximum : nextScale
        let currentImageWidth = nextScale * originWidth
        let currentImageHeight = nextScale * originHeight

        let { left, top } = this._getOffsetInElement(e, this.imgDOM)
        let rateX = left / imageWidth
        let rateY = top / imageHeight
        let newLeft = rateX * currentImageWidth
        let newTop = rateY * currentImageHeight

        this.setState({
            scale: nextScale,
            startLeft: currentLeft + (left - newLeft),
            startTop: currentTop + (top - newTop),
            currentLeft: currentLeft + (left - newLeft),
            currentTop: currentTop + (top - newTop)
        })
    }

    /**
     * 获取鼠标当前相对于某个元素的位置
     * @param e        {object}    原生事件对象
     * @param target {DOMobject} 目标DOM元素
     * @return object 包括offsetLeft和offsetTop
     *
     * Tips:
     * 1.offset 相关属性在 display: none 的元素上失效，为0
     * 2.offsetWidth/offsetHeight 包括border-width，clientWidth/clientHeight不包括border-width，只是可见区域而已
     * 3.offsetLeft/offsetTop 是从当前元素边框外缘开始算，一直到定位父元素的距离，clientLeft/clientTop其实就是border-width
     */
    _getOffsetInElement = (e, target) => {
        let currentDOM = e.target || e.toElement
        if (!this._inTargetArea(currentDOM, target)) return null
        let left, top, right, bottom
        const { left: x, top: y } = this._getOffset(target)
        left = e.clientX - x
        top = e.clientY - y
        right = target.offsetWidth - left
        bottom = target.offsetHeight - top
        return { top, left, right, bottom }
    }

    /**
     * 判断一个DOM元素是否包裹在另一个DOM元素中【父子关系或者层级嵌套都可以】
     * @param  {Object} DOM         事件对象中的event.target/或者是需要检测的DOM元素
     * @param  {Object} targetDOM   作为限制范围的DOM元素
     * @return {Boolean}            true----是包裹关系，false----不是包裹关系
     */
    _inTargetArea = (DOM, targetDOM) => {
        if (DOM === targetDOM) return true
        let parent = DOM.parentNode
        while (parent != null) {
            if (parent === targetDOM) return true
            DOM = parent
            parent = DOM.parentNode
        }
        return false
    }

    /**
     * 获取某个 DOM 元素相对视口的位置信息
     * @param el {object} 目标元素
     * @return object {object} 位置信息对象
     */
    _getOffset = (el) => {
        const doc = document.documentElement
        const docClientWidth = doc.clientWidth
        const docClientHeight = doc.clientHeight
        let positionInfo = el.getBoundingClientRect()
        return {
            left: positionInfo.left,
            top: positionInfo.top,
            right: docClientWidth - positionInfo.right,
            bottom: docClientHeight - positionInfo.bottom
        }
    }

    /**
     * 获取图片原始尺寸信息
     * @param image
     * @returns {Promise<any>}
     * @private
     */
    _getImageOriginSize = (image) => {
        const src = typeof image === 'object' ? image.src : image

        return new Promise(resolve => {
            const image = new Image()
            image.src = src
            image.onload = function () {
                const { width, height } = image
                resolve({
                    width,
                    height
                })
            }
        })
    }

    render() {
        const { id, children, className } = this.props
        return (
            <div id={id}
                 className={`react-picture-viewer ${className}`}
                 onMouseLeave={this.handleMouseLeave}
                 onMouseDown={this.handleMouseDown}
                 onMouseMove={this.handleMouseMove}
                 onMouseUp={this.handleMouseUp}>
                {children}
            </div>
        )
    }
}

export default ReactPictureViewer
