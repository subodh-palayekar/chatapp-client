import React, { useState } from 'react'
import "./creategroup.css"
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import capitalizeFirstLetter from '../../Utils/capitalize';
import { Skeleton } from '@mui/material';

const GroupPreview = ({userData,userArr}) => {
    const{name,username,_id} = userData;
    const [add,setAdd] = useState(false);
    const isLoading =false;
    

    const handleClick=()=>{
        if(!add){
            userArr.push(_id)
        }else{
            const index = userArr.indexOf(_id)
            if(index!==-1){
                userArr.splice(index,1);
            }
        }
        setAdd(!add)
        console.log(userArr);
    }
  return (
    // <div className='userdata-container'>
    //     <div className="userdata-icon">
    //     </div> 
    //     <div className="userdata-details">
    //         <span className="userdata-name">{capitalizeFirstLetter(name)}</span>
    //         <span className="userdata-username">@{username}</span>
    //     </div>
    //     <div className="userdata-add-icon" onClick={handleClick}>
    //         {
    //             add? <OfflinePinIcon style={{fontSize:"35px",color:"#19e029",backgroundColor:"transparent"}}/>
    //             : <AddCircleOutlinedIcon style={{fontSize:"35px",color:"red",backgroundColor:"transparent"}}/> 
    //         }
    //     </div>
    // </div>

    
    <div className='userdata-container'>
    <div className="userdata-icon">
        {isLoading ? (
            <Skeleton variant="circular" width={50} height={50} />
        ) : (
           <div></div>
        )
        }
    </div>
    <div className="userdata-details">
        {isLoading ? (
            <Skeleton variant="text" width={100} height={20} />
        ) : (
            <span className="userdata-name">{capitalizeFirstLetter(name)}</span>
        )}
        {isLoading ? (
            <Skeleton variant="text" width={150} height={16} />
        ) : (
            <span className="userdata-username">@{username}</span>
        )}
    </div>
    <div className="userdata-add-icon" onClick={handleClick}>
        {isLoading ? (
            <Skeleton variant="circular" width={50} height={50} />
        ) : (
            add ? (
                <OfflinePinIcon style={{ fontSize: "35px", color: "#19e029", backgroundColor: "transparent" }} />
            ) : (
                <AddCircleOutlinedIcon style={{ fontSize: "35px", color: "red", backgroundColor: "transparent" }} />
            )
        )}
    </div>
</div>
  )
}

export default GroupPreview
