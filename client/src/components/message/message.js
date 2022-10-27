import React from 'react'
import "./message.css"
import {format} from "timeago.js"

function Message({ messages ,own}) {
  return (
    <div className={own ? "message own": "message"}>
        <div className='messageTop'>
            <img className='messageImage'
            src='https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png'
            alt='defaultProfile'
            />
            <p className='messageText'>{messages.text}</p>
        </div>
        <div className='messageBottom'>{format(messages.createdAt)}</div>
    </div>
  )
}

export default Message