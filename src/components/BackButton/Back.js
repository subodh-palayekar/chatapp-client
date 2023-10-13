import React, { useContext } from 'react'
import { myContext } from '../Maincontainer/Maincontainer'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import { Button} from '@mui/material';

const Back = () => {
    const {setSideBarClick} = useContext(myContext);
    const navigate = useNavigate()

    const handleClick=()=>{
        setSideBarClick(false);
        navigate("/app")
    }

  return (
    <div className="sidebar-top-right backBtn">
      <Button focusRipple>
        <div className="sidebar-icon-holder" onClick={handleClick} >
            <KeyboardBackspaceIcon style={{fontSize: '25px',float:"right" }} className='sidebar-icon'/>
        </div>
      </Button>
    </div>
  )
}

export default Back
