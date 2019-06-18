import React from 'react'
import ReactDOM from 'react-dom'
// style
import './index.css'
// components
import ReactPictureViewer from '../src'
// picture
import picture from './pic.jpg'

const root = document.getElementById('root')

ReactDOM.render(
    <ReactPictureViewer className="viewport"
                        contain
                        center
                        minimum={0.4}
                        maximum={2}>
      <img src={picture} alt="picture" draggable={false}/>
    </ReactPictureViewer>
, root)
