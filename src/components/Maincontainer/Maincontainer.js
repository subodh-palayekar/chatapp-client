import React from 'react'
import  "./Maincontainer.css"
import Login from '../LoginComp/Login'
import Register from '../Register/Register'
import { Outlet } from 'react-router-dom'
import SideBar from '../Sidebar/SideBar'
import Chatarea from '../ChatArea/Chatarea'
import Welcome from '../Welcome/Welcome'
import Adduser from '../AddUser/Adduser'
import Creategroup from '../CreateGroup/Creategroup'
import { createContext, useState } from "react";
export const myContext = createContext();


const Maincontainer = () => {
  const [refresh, setRefresh] = useState(true);
  const [sideBarClick , setSideBarClick] = useState(false);
  return (
    <div className='main-container'>
      <myContext.Provider value={{ 
          refresh: refresh, 
          setRefresh: setRefresh,
          sideBarClick:sideBarClick,
          setSideBarClick:setSideBarClick
        }}>
        <SideBar />
        <Outlet />
      </myContext.Provider>
    </div>
  )
}

export default Maincontainer
