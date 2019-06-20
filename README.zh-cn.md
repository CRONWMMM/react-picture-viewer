# react-picture-viewer

基于 React 封装的图片查看器组件

![ReactPictureViewer Demo](https://raw.githubusercontent.com/CRONWMMM/react-picture-viewer/master/demo.gif)

简体中文 | [English](https://github.com/CRONWMMM/react-picture-viewer/blob/master/README.md)

## 功能

- 可以在视口范围内自由拖拽图片
- 可以在视口范围内自由缩放图片
- 可以设置图片的最大 / 最小缩放尺寸
- 无任何依赖（除了 `React`）

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
class PicViewer extends React.Component {
  // ...
  render() {
    return (
      <div>
        <PictureViewer>
          <img src="..." alt="picture" draggable="false" />
        </PictureViewer>
      </div>
     )
  }
  // ...
}
```

## Props
### children (必传)
```js
<PictureViewer>
  <img src="..." alt="picture" draggable="false" />
</PictureViewer>
```
这个 `<Img />` 是必传的

### id
```js
<div>
  <PictureViewer id="picture-viewer1">...</PictureViewer>
  <PictureViewer id="picture-viewer2">...</PictureViewer>
</div>
```
当同一个功能组件里使用到两个 `react-picture-viewer` 的实例，需要传递 `id` 属性进行区分，类似于 `react` 提供的 `key`

### className
```js
<PictureViewer className="picture-viewer">...</PictureViewer>
```
样式类名

### center
```js
<PictureViewer center>...</PictureViewer>
```
如果设置为 `true` ，那么图片默认初始位置在视口中间，默认为 `true`

### contain
```js
<PictureViewer contain>...</PictureViewer>
```
如果设置为 `true` ，那么图片默认初始尺寸将限制在视口范围内，否则图片会按原始尺寸展示，默认为 `true`

### width
```js
<PictureViewer width={500}>...</PictureViewer>
```
```js
<PictureViewer width="50vw">...</PictureViewer>
```
视口宽度，可以是 `string` 或者 `number`.

### height
```js
<PictureViewer height={400}>...</PictureViewer>
```
```js
<PictureViewer width="40%">...</PictureViewer>
```
视口高度，可以是 `string` 或者 `number`.

### minimum
```js
<PictureViewer minimum={1}>...</PictureViewer>
```
最小缩放率, 默认 `0.8`

### maximum
```js
<PictureViewer maximum={5}>...</PictureViewer>
```
最大缩放率, 默认 `8`

### rate
```js
<PictureViewer rate={20}>...</PictureViewer>
```
图片缩放速率，设置越大，缩放速率越快

