import React from 'react'
import "./Welcome.css"
import welcomeImg from "../../Assets/welcomeImg.png"
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"))
  if(!userData){
    navigate('/')
    return 
  }
  return (
    <div className='welcome-container mobile-container'>
      <img src={welcomeImg} alt="welcome" className="welcome-image" />
      <b>Hi , {userData.name} 👋</b>
      <p>Select User & Start Conversation</p>
    </div>
  )
}

export default Welcome
