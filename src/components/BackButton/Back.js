import React, { useContext } from 'react'
import { myContext } from '../Maincontainer/Maincontainer'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Back = () => {
    const {sideBarClick,setSideBarClick} = useContext(myContext);

    const handleClick=()=>{
        setSideBarClick(false);
        console.log(sideBarClick);
    }

  return (
    <div className="sidebar-top-right backBtn">
        <div className="sidebar-icon-holder" onClick={handleClick}>
            <KeyboardBackspaceIcon style={{fontSize: '25px',float:"right" }} className='sidebar-icon'/>
        </div>
    </div>
  )
}

export default Back
