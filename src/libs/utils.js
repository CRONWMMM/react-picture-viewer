
/**
 * 检测传入的参数类型
 * @param obj {All}	需要进行参数检测的对象
 * @return {String} 所属类型字符串
 */
function typeOf (obj) {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    }
    return map[toString.call(obj)]
}
function isNumber (obj) {
    return typeOf(obj) === 'number' && !isNaN(obj)
}
function isNaN (obj) {
    return obj.toString() === 'NaN'
}
function isString (obj) {
    return typeOf(obj) === 'string'
}
function isFunction (obj) {
    return typeOf(obj) === 'function'
}
function isArray (obj) {
    return typeOf(obj) === 'array'
}
function isObject (obj) {
    return typeOf(obj) === 'object'
}
function isUndefined (obj) {
    return typeOf(obj) === 'undefined'
}

/**
 * 判空函数
 * @param  {obj/arr/str}  检测对象
 */
function isEmpty(obj){
    if (typeOf(obj) === "object") {
        if (Array.isArray(obj)) {		// array
            return !obj.length>0
        }else{							// object
            return !(function(obj) {
                let len = 0;
                for (let key in obj) { // eslint-disable-line
                    len = ++len;
                }
                return len;
            })(obj) > 0;
        }
    } else if (typeOf(obj) === "string"){	// string
        return !(obj.trim()).length>0
    } else {								// error
        throw new Error("empty函数接收的参数类型：对象、数组、字符串");
    }
}

/**
 * 判断两个对象是否一样（注意，一样不是相等）
 * 1. 如果是非引用类型的值，直接使用全等比较
 * 2. 如果是数组或对象，则会先比较引用指针是否一一致
 * 3. 引用指针不一致，再比较每一项是否相同
 *
 * @param target {All data types} 参照对象
 * @param obj {All data types} 比较对象
 * @returns {*}
 */
function isEqual(target, obj) {
    if (typeof target !== typeof obj) {
        return false
    } else if (typeof target === 'object') {
        if (target === obj) { // 先比较引用
            return true
        } else if (Array.isArray(target)) { // 数组
            if (target.length !== obj.length) { // 长度不同直接 return false
                return false
            } else { // 否则依次比较每一项
                return target.every((item, i) => isEqual(item, obj[i]))
            }
        } else { // 对象
            const targetKeyList = Object.keys(target)
            const objKeyList = Object.keys(obj)
            if (targetKeyList.length !== objKeyList.length) { // 如果 keyList 的长度不同直接 return false
                return false
            } else {
                return targetKeyList.every((key) => isEqual(target[key], obj[key]))
            }
        }
    } else {
        return target === obj
    }
}

/**
 * 浏览器全屏
 */
function fullScreen() {
    var docElm = document.documentElement;
    //W3C
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    }
    //FireFox
    else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    }
    //Chrome等
    else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }
    //IE11
    else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
    }
}

/**
 * 取消浏览器全屏
 */
function normalScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

/**
 * 对象深度查找
 * @param target Object 需要处理的原始对象
 * @param callback filter函数
 * @return Object 符合filter筛选条件的对应对象
 */
function findDeeply(target, callback) {
    const flag = typeOf(target)
    let result
    if (flag === 'array') {
        for (let i = 0, len = target.length, item; i < len; i++) {
            item = target[i]
            result = findDeeply(item, callback)
            if (result) return result
        }
    }
    else if (flag === 'object') {
        if (callback(target)) {
            return target
        }
        for (let k in target) {
            result = findDeeply(target[k], callback)
            if (result) return result
        }
    }
}

/**
 * 数组去空【空字符串 null undefined】
 * @param arr Array 需要处理的原始数组
 * @return Array 处理后的数组对象
 *
 */
function arrayDeleteEmpty(arr) {
    let clean = []
    let target = 'null undefined'

    for (let i = 0, len = arr.length; i < len; i++) {
        let item = arr[i]
        let type = typeOf(item)
        if (type === 'string' && isEmpty(item) || target.indexOf(type) >= 0)
            continue
        clean.push(item)
    }
    return clean
}

export {
    typeOf,
    isArray,
    isFunction,
    isNaN,
    isNumber,
    isObject,
    isString,
    isUndefined,
    isEmpty,
    isEqual,
    fullScreen,
    normalScreen,
    findDeeply,
    arrayDeleteEmpty
}
