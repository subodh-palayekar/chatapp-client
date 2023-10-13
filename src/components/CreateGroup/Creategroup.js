import React, { useEffect, useState ,useContext, useRef} from 'react'
import "./creategroup.css"
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import GroupPreview from './GroupPreview';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import errorHandling from '../../Utils/errorhandling';
import { myContext } from '../Maincontainer/Maincontainer';
import Back from '../BackButton/Back';
import { toast } from 'react-toastify';
import { Box, CircularProgress } from '@mui/material';


const Creategroup = () => {


  let userArr =[]
  const navigate = useNavigate();
  const [users,setUsers] = useState([]);
  const [search,setSearch] = useState("");
  const [groupName,setGroupName] = useState("Group Name");
  const container = useRef(null);
  const{refresh,setRefresh,sideBarClick} = useContext(myContext);
  const userData =  JSON.parse(localStorage.getItem("userData"));
  const [loading,setLoading]=useState(true);

  if(!userData ){
      navigate("/")
      
  }
  const config = {headers:{Authorization:`Bearer ${userData?.token}`}}

  const fetchUser=async()=>{
    try{
      const resp = await axios.get('https://chatappserver-epqb.onrender.com/user/fetchusers',config);
      setUsers(resp.data)
      console.log(resp.data);
      setLoading(false);
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

  useEffect(()=>{
    if(!userData || !userData?.token){
      navigate('/')
      return;
    }
    fetchUser()
  },[refresh])

  const handleSearch = ()=>{
    return users.filter((user)=>{
      return (user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase()))
    })
  }

  const handleCreateGroup=async ()=>{
    try{
      const resp = await axios.post("https://chatappserver-epqb.onrender.com/chat/creategroup",{name:groupName,users:userArr},config);
      navigate("/app/allgroups")
      setRefresh(!refresh)
      toast.success('Group Successfully Created',{
        position:"top-center",
        autoClose:"1300",
        hideProgressBar:false,
        closeOnClick:true,
        draggable:true,
        progress:undefined,
        theme:"colored"
      })
    }catch(e){
      console.log(e);
      toast.error('Error While Creating Group',{
        position:"top-center",
        autoClose:"1300",
        hideProgressBar:false,
        closeOnClick:true,
        draggable:true,
        progress:undefined,
        theme:"colored"
      })
    }


  }


  return (
    <div ref={container} className='adduser-container mobile-container'>
      <div className="adduser-top">
            <div className="sidebar-top-left">
                <div className="sidebar-icon-holder">
                <GroupAddOutlinedIcon style={{ fontSize: '25px' }} className='sidebar-icon'/>
                </div>
                <span className="sidebar-profile-name">Create Group</span>
            </div>
            <Back/>
      </div>
      <div className="group-bottom">
            <div className="creategroup-bottom-container">
              <div className="group-card">
                <div className="group-icon">
                <GroupsOutlinedIcon style={{ fontSize: '25px' }} className='sidebar-icon'/>
                </div>
                <span className="groupname-display">{groupName}</span>
                <input type="text"  placeholder="Enter Group Name" className="groupname-enter" onChange={(e)=>{setGroupName(e.target.value)}} />
                <div className="search-container">
                  <input type="text" placeholder='Search User' className="search group-search" onChange={(e)=>{setSearch(e.target.value)}} />     
                    <SearchOutlinedIcon className='search-icon'/>
                </div>
                <div className="groupsearch-user">
                 {
                  loading ? (
                    <Box sx={{
                      display:"flex",
                      justifyContent:"center",
                      alignItems:"center", 
                      width:"100%",
                      backgroundColor:"transparent",
                      color:"#6c28f4"
                      }}>
                      <CircularProgress sx={{color:'#6c28f4'}}/>
                  </Box>
                  ):(handleSearch().map((user,index)=>{
                  return (<GroupPreview userArr={userArr} userData={user}  key={index}/>)
                }))}
                </div>
                <div className="create-group-btn" onClick={handleCreateGroup}>
                  Create Group
                </div>
              </div>
            </div>
      </div>
    </div>
  )
}

export default Creategroup
