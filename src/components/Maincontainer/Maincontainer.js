import React from 'react'
import  "./Maincontainer.css"
import { Outlet } from 'react-router-dom'
import SideBar from '../Sidebar/SideBar'
import { createContext, useState } from "react";
export const myContext = createContext();


const Maincontainer = () => {
  const [refresh, setRefresh] = useState(true);
  const [sideBarClick , setSideBarClick] = useState(false);
  const [messageLoading , setMessageLoading] = useState(true);
  return (
    <div className='main-container'>
      <myContext.Provider value={{ 
          refresh: refresh, 
          setRefresh: setRefresh,
          sideBarClick:sideBarClick,
          setSideBarClick:setSideBarClick,
          messageLoading,setMessageLoading
        }}>
        <SideBar />
        <Outlet />
      </myContext.Provider>
    </div>
  )
}

export default Maincontainer
