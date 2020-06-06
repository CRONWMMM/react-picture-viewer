# react-picture-viewer

基于 React 封装的图片查看器组件

![ReactPictureViewer Demo](https://raw.githubusercontent.com/CRONWMMM/react-picture-viewer/master/demo.gif)

简体中文 | [English](https://github.com/CRONWMMM/react-picture-viewer/blob/master/README.md)

## 功能

* [x] 可以在视口范围内自由拖拽图片
* [x] 可以在视口范围内自由缩放图片
* [x] 可以设置图片的最大 / 最小缩放尺寸
* [x] 无任何依赖（除了 `React`）

## 安装
```
npm install react-picture-viewer --save
```
或者
```
yarn add react-picture-viewer
```

## 本地 Demo
```
yarn start
```
或者
```
npm run start
```

## 使用
只需要在项目里引入即可
```js
import ReactPictureViewer from 'react-picture-viewer'
```

## 示例
```js
import ReactPictureViewer from 'react-picture-viewer';

class Demo extends React.Component {
  // ...
  render() {
    return (
      <div>
        <ReactPictureViewer>
          <img src="..." alt="picture" draggable="false" />
        </ReactPictureViewer>
      </div>
     )
  }
  // ...
}
```

## Props
### children (必传)
```js
<ReactPictureViewer>
  <img src="..." alt="picture" draggable="false" />
</ReactPictureViewer>
```
这个 `<img />` 是必传的，必须以 `<img />` 作为组件子元素

### id
```js
<div>
  <ReactPictureViewer id="picture-viewer1">...</ReactPictureViewer>
  <ReactPictureViewer id="picture-viewer2">...</ReactPictureViewer>
</div>
```
当同一个功能组件里使用到两个 `react-picture-viewer` 的实例，需要传递 `id` 属性进行区分，类似于 `react` 提供的 `key`

### className
```js
<ReactPictureViewer className="picture-viewer">...</ReactPictureViewer>
```
样式类名

### center
```js
<ReactPictureViewer center>...</ReactPictureViewer>
```
如果设置为 `true` ，那么图片默认初始位置在视口中间，默认为 `true`

### contain
```js
<ReactPictureViewer contain>...</ReactPictureViewer>
```
如果设置为 `true` ，那么图片默认初始尺寸将限制在视口范围内，否则图片会按原始尺寸展示，默认为 `true`

### width
```js
<ReactPictureViewer width={500}>...</ReactPictureViewer>
```
```js
<ReactPictureViewer width="50vw">...</ReactPictureViewer>
```
视口宽度，可以是 `string` 或者 `number`.

### height
```js
<ReactPictureViewer height={400}>...</ReactPictureViewer>
```
```js
<ReactPictureViewer width="40%">...</ReactPictureViewer>
```
视口高度，可以是 `string` 或者 `number`.

### minimum
```js
<ReactPictureViewer minimum={1}>...</ReactPictureViewer>
```
最小缩放率, 默认 `0.8`

### maximum
```js
<ReactPictureViewer maximum={5}>...</ReactPictureViewer>
```
最大缩放率, 默认 `8`

### rate
```js
<ReactPictureViewer rate={20}>...</ReactPictureViewer>
```
图片缩放速率，设置越大，缩放速率越快

