import React, { useContext } from 'react'
import "./Userdata.css"
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import axios from 'axios';
import { myContext } from '../Maincontainer/Maincontainer';
import capitalizeFirstLetter from '../../Utils/capitalize';


const Userdata = ({data,token,isFriend,setLoading}) => { 
    console.log("all user in add user",isFriend);
    const {name,username,_id}=data;
    const{refresh,setRefresh} = useContext(myContext);
    

    const config = {headers:{Authorization:`Bearer ${token}`}}


    const handleAddUser = async () => {
        try {
            setLoading(true);
            const response = await axios.post("https://chatappserver-epqb.onrender.com/chat/", { userId: _id }, config);
            console.log(response.data); 
            setRefresh(!refresh);
        } catch (error) {
            console.error(error.response.data.message);
        } finally {
            setLoading(false); 
        }
    };
    
    
  return (
    <div className='userdata-container'>
        <div className="userdata-icon">
            {capitalizeFirstLetter(name)[0]}
        </div>
        <div className="userdata-details">
            <span className="userdata-name">{capitalizeFirstLetter(name)}</span>
            <span className="userdata-username">@{username}</span>
        </div>
        <div className="userdata-add-icon">
            {
                isFriend ? <OfflinePinIcon  style={{fontSize:"35px",color:"#19e029",backgroundColor:"transparent" ,cursor: "not-allowed"}}/>
                : <AddCircleOutlinedIcon onClick={handleAddUser} style={{fontSize:"35px",color:"red",backgroundColor:"transparent"}}/> 
            }
        </div>
    </div>

  )
}

export default Userdata
