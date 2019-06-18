# react-picture-viewer

An image viewer for React with no dependencies.

![ReactPictureViewer Demo](https://raw.githubusercontent.com/CRONWMMM/react-picture-viewer/master/demo.gif)

## Features

- You can freely drag picture within the viewport
- You can freely zoom picture within the viewport
- Min/max zoom size
- No dependencies

## Installation
```
npm install react-picture-viewer --save
```
```
yarn add react-picture-viewer
```

## Usage
Include the main js module:
```js
import ReactPictureViewer from 'react-picture-viewer'
```

## Example
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
#### children (required)
```js
<PictureViewer>
  <img src="..." alt="picture" draggable="false" />
</PictureViewer>
```
You should always pass an `<Img />` element as its children.

#### id (optional)
```js
<div>
  <PictureViewer id="picture-viewer1">...</PictureViewer>
  <PictureViewer id="picture-viewer2">...</PictureViewer>
</div>
```
Unique identifier for components, useful when rendering multiple components on a page

#### className (optional)
```js
<PictureViewer className="picture-viewer">...</PictureViewer>
```
ClassName

#### center (optional)
```js
<PictureViewer center>...</PictureViewer>
```
If true then the pictures will be displayed in the middle of the viewport, default to true.

#### width (optional)
```js
<PictureViewer width={500}>...</PictureViewer>
```
```js
<PictureViewer width="50vw">...</PictureViewer>
```
Width of viewport, it can be `string` or `number`.

#### height (optional)
```js
<PictureViewer height={400}>...</PictureViewer>
```
```js
<PictureViewer width="40%">...</PictureViewer>
```
Height of viewport, it can be `string` or `number`.

#### minimum (optional)
```js
<PictureViewer minimum={1}>...</PictureViewer>
```
Minimum scaling ratio, default to `0.8`

#### maximum (optional)
```js
<PictureViewer maximum={5}>...</PictureViewer>
```
Maximum scaling ratio, default to `8`

#### rate (optional)
```js
<PictureViewer rate={20}>...</PictureViewer>
```
The rate of Image Scaling, default to 10. Bigger the number you set, faster the image will zoom in.

