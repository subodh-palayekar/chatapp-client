import React from 'react'
import "./Message.css"
import dateToTime from "../../Utils/dateToTime"

const OtherMessage = ({content,isGroupM,senderName,time}) => {
  return (
    <div className='otherMessage-container'>
    {isGroupM && <span className='sender-name'>{senderName}</span>}
    <span className='other-message'>{content}</span>
    <span className="time-other">{dateToTime(time)}</span>
    </div>
  )
}

export default OtherMessage
