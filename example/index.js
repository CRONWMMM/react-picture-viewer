import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
// style
import './index.css'
// components
import ReactPictureViewer from '../src'
// picture
import picture1 from './pic1.jpg'
import picture2 from './pic2.jpg'
import picture3 from './pic3.jpg'
import picture4 from './pic4.jpg'
import picture5 from './pic5.jpg'

const root = document.getElementById('root')

class Demo extends Component {
    state = {
        src1: picture1,
        src2: picture4
    }

    changePicture1 = (src) => {
        this.setState({
            src1: src
        })
    }

    changePicture2 = (src) => {
        this.setState({
            src2: src
        })
    }

    render() {
        const { src1, src2 } = this.state
        return (
            <Fragment>
                <ReactPictureViewer className="viewport" contain center minimum={0.5} maximum={2}>
                    <img src={src1} alt="picture-view" draggable={false}/>
                </ReactPictureViewer>
                <ul className="list">
                    <li className="item" onClick={() => {this.changePicture1(picture1)}}><img src={picture1} alt="picture1" draggable={false}/></li>
                    <li className="item" onClick={() => {this.changePicture1(picture2)}}><img src={picture2} alt="picture2" draggable={false}/></li>
                    <li className="item" onClick={() => {this.changePicture1(picture3)}}><img src={picture3} alt="picture3" draggable={false}/></li>
                </ul>

                <hr />

                <ReactPictureViewer id="viewport2" className="viewport" contain center minimum={0.5} maximum={2}>
                    <img src={src2} alt="picture" draggable={false}/>
                </ReactPictureViewer>
                <ul className="list">
                    <li className="item" onClick={() => {this.changePicture2(picture4)}}><img src={picture4} alt="picture4" draggable={false}/></li>
                    <li className="item" onClick={() => {this.changePicture2(picture5)}}><img src={picture5} alt="picture5" draggable={false}/></li>
                </ul>
            </Fragment>
        )
    }
}

ReactDOM.render(
    <Demo />
, root)
