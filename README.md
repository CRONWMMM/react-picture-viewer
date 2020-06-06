# react-picture-viewer

An picture viewer for React with no dependencies.

![ReactPictureViewer Demo](https://raw.githubusercontent.com/CRONWMMM/react-picture-viewer/master/demo.gif)

English | [简体中文](https://github.com/CRONWMMM/react-picture-viewer/blob/master/README.zh-cn.md)

## Features

* [x] You can freely drag picture within the viewport
* [x] You can freely zoom picture within the viewport
* [x] Min/max zoom size
* [x] No dependencies, except React

## Installation
```
npm install react-picture-viewer --save
```
or
```
yarn add react-picture-viewer
```

## Demo
You can run the project locally to see the demo.
```
yarn start
```
or
```
npm run start
```

## Usage
Include the main js module:
```js
import ReactPictureViewer from 'react-picture-viewer'
```

## Example
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
### children (required)
```js
<ReactPictureViewer>
  <img src="..." alt="picture" draggable="false" />
</ReactPictureViewer>
```
You should always pass an `<Img />` element as its children.

### id (optional)
```js
<div>
  <ReactPictureViewer id="picture-viewer1">...</ReactPictureViewer>
  <ReactPictureViewer id="picture-viewer2">...</ReactPictureViewer>
</div>
```
Unique identifier for components, useful when rendering multiple components on a page

### className (optional)
```js
<ReactPictureViewer className="picture-viewer">...</ReactPictureViewer>
```
ClassName

### center (optional)
```js
<ReactPictureViewer center>...</ReactPictureViewer>
```
If true then the pictures will be displayed in the middle of the viewport, default to true.

### contain (optional)
```js
<ReactPictureViewer contain>...</ReactPictureViewer>
```
If true then the initial size of the picture will be limited to the viewport, else the image will be displayed in the original size, default to true.

### width (optional)
```js
<ReactPictureViewer width={500}>...</ReactPictureViewer>
```
```js
<ReactPictureViewer width="50vw">...</ReactPictureViewer>
```
Width of viewport, it can be `string` or `number`.

### height (optional)
```js
<ReactPictureViewer height={400}>...</ReactPictureViewer>
```
```js
<ReactPictureViewer width="40%">...</ReactPictureViewer>
```
Height of viewport, it can be `string` or `number`.

### minimum (optional)
```js
<ReactPictureViewer minimum={1}>...</ReactPictureViewer>
```
Minimum scaling ratio, default to `0.8`

### maximum (optional)
```js
<ReactPictureViewer maximum={5}>...</ReactPictureViewer>
```
Maximum scaling ratio, default to `8`

### rate (optional)
```js
<ReactPictureViewer rate={20}>...</ReactPictureViewer>
```
The rate of Image Scaling, default to 10. Bigger the number you set, faster the image will zoom in.

