import React, { useContext } from 'react'
import { myContext } from '../Maincontainer/Maincontainer'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';

const Back = () => {
    const {sideBarClick,setSideBarClick} = useContext(myContext);
    const navigate = useNavigate()

    const handleClick=()=>{
        setSideBarClick(false);
        console.log(sideBarClick);
        navigate("/app")
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
