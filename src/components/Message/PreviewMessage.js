import React, { useContext } from 'react'
import "./Message.css"
import { useNavigate } from 'react-router-dom'
import capitalizeFirstLetter from '../../Utils/capitalize'
import { myContext } from '../Maincontainer/Maincontainer'
import { Box } from '@mui/material'


const PreviewMessage = ({data ,chatName,sidebarContainer}) => {
const {setSideBarClick} = useContext(myContext)
const {_id,latestMessage,isGroupChat} = data

const name = capitalizeFirstLetter(chatName ? chatName : `Deleted Chat`)

const otherUser = data?.users[1]?._id
  const navigate = useNavigate();
  const handleclick =()=>{

    if(window.document.defaultView.innerWidth<=615){
      setSideBarClick(true);
      sidebarContainer.current?.classList.toggle("click")
    }

    if(isGroupChat){
      navigate(`chat/${_id}&${chatName}&${data.groupAdmin._id}&${otherUser}`)
    }else{
      navigate(`chat/${_id}&${chatName}&false&${otherUser}`)
    }
  }
  return (
     <div className='prev-message' onClick={()=>{handleclick()}}>
          <div className="prev-icon"> 
             { isGroupChat ? capitalizeFirstLetter(name).substr(0,2) : capitalizeFirstLetter(name)[0]}
          </div>
          <div className="prev-details">
              <div className="prev-name">{name}</div>
              <div className="prev-latest-message">{latestMessage?.content}</div>
          </div>
      </div>
  )
}

export default PreviewMessage
