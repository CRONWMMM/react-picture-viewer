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
                        width={660}
                        height={440}>
        <img src={picture} alt="picture" draggable={false}/>
    </ReactPictureViewer>
, root)
