import React, { useContext, useEffect, useRef, useState } from 'react'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import "./creategroup.css"; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import errorHandling from '../../Utils/errorhandling';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Back from '../BackButton/Back';
import { myContext } from '../Maincontainer/Maincontainer';
import capitalizeFirstLetter from '../../Utils/capitalize';


const Allgroups = () => {

    const navigate = useNavigate();  
    const [search,setSearch] = useState("");
    const [groups,setAllGroups] = useState([]);
    const[userAdded,setUserAdded]=useState(false);
    const {sideBarClick,setSideBarClick} = useContext(myContext)
    const container = useRef(null);
    const userData =  JSON.parse(localStorage.getItem("userData"));
    if(!userData ){
        navigate("/")
    }

    
      

    const config = {headers:{Authorization:`Bearer ${userData?.token}`}}

    const fetchAllGroups = async ()=>{
        try{
            const resp = await axios.get("http://localhost:5000/chat/fetchgroup",config);
            setAllGroups(resp.data);
            console.log(groups);
        }catch(e){
            errorHandling(e,navigate);
        }
    }

    useEffect(()=>{
        if(sideBarClick){
            container.current?.classList.add("show-me");
            container.current?.classList.remove("mobile-container");
        }else if(!sideBarClick){
            container.current?.classList.remove("show-me");
            container.current?.classList.add("mobile-container");
        }
    },[sideBarClick])

    const handleSearch=()=>{
        return ( 
            groups.filter((group)=>{
                return group.chatName.toLowerCase().includes(search.toLowerCase())
            })
        )
    }

    const handleAddMe=async(chatId)=>{
        try{
            const resp = await axios.patch("http://localhost:5000/chat/addme",{chatId:chatId,userId:userData._id},config);
            console.log("user Added", resp);
            setUserAdded(!userAdded)
        }catch(e){
            errorHandling(e,navigate);
        }

    }
    useEffect(()=>{
        if(!userData || !userData?.token){
            navigate('/')
            return;
          }
        fetchAllGroups();
    },[userAdded])

  return (
    <div ref={container} className='adduser-container mobile-container '>
      <div className="adduser-top">
            <div className="sidebar-top-left">
                <div className="sidebar-icon-holder">
                <GroupsOutlinedIcon style={{ fontSize: '25px' }} className='sidebar-icon'/>
                </div>
                <span className="sidebar-profile-name">All Groups</span>
            </div>
            <Back/>
      </div>
      <div className="adduser-bottom">
        <div className="search-container">
            <input type="text" placeholder='Search Groups' className="search" onChange={(e)=>setSearch(e.target.value)} />     
                <SearchOutlinedIcon className='search-icon'/>
            </div>
            <div className="group-result">
                {
                    handleSearch().map((group,index)=>{
                    return <div className="group-result-card-container">
                            <div className="group-card-icon">{capitalizeFirstLetter(group.chatName).substr(0,2)}</div>
                            <div className="group-card-name"> {capitalizeFirstLetter(group.chatName)}</div>
                            {
                                group.users.includes(userData._id) ? <div className="group-card-addbtn present">Already Added</div>
                                : <button className="group-card-addbtn" onClick={()=>handleAddMe(group._id)}>Add Me</button>
                            }
                        </div>
                    })
                }

            </div>
        </div>      
            
    </div>
  )
}

export default Allgroups
