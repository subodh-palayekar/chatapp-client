import React, { useEffect, useState ,useContext, useRef} from 'react'
import "./Adduser.css"
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Userdata from '../UserData/Userdata';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import errorHandling from '../../Utils/errorhandling';
import { myContext } from '../Maincontainer/Maincontainer';
import Back from '../BackButton/Back';
import UserDataSkeleton from '../Skeleton/UserDataSkeleton';


const Adduser = () => {

    const navigate = useNavigate();
    const [users,setUsers] = useState([]);
    const [search,setSearch] = useState("");
    const [friends,setFriends]=useState([]);
    const [loading,setLoading] = useState(true);
    // const [isFriend,setIsFriend] = useState(false);
    const{refresh,setRefresh,sideBarClick} = useContext(myContext);
    const container = useRef(null);
    
    const userData =  JSON.parse(localStorage.getItem("userData"));

    if(!userData ){
        navigate("/")
        
    }
    const config = {headers:{Authorization:`Bearer ${userData?.token}`}}

    const fetchUser=async()=>{
      try{
        setLoading(true);
        const resp = await axios.get('http://localhost:5000/user/fetchmodify',config);
        setUsers(resp.data.users)
        console.log(resp.data.friends);
        setFriends(resp.data.friends[0]);
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
      fetchUser()
    },[refresh])

    const handleSearch = ()=>{
      return users.filter((user)=>{
        return (user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase()))
      })
    }

  return (
    <div ref={container} className='adduser-container mobile-container'>
      <div className="adduser-top">
            <div className="sidebar-top-left">
                <div className="sidebar-icon-holder">
                  <PersonAddAltOutlinedIcon style={{fontSize: '25px' }} className='sidebar-icon'/>
                </div>
                <span className="sidebar-profile-name">Add User</span>
                
            </div>
            <Back/>
      </div>
      <div className="adduser-bottom">
            <div className="search-container">
                <input type="text" placeholder='Search' className="search" onChange={(e)=>setSearch(e.target.value)} />     
                    <SearchOutlinedIcon className='search-icon'/>
            </div>
            <div className="userResult">
                { handleSearch().map((user,index)=>{
                  let isFriend;
                  friends.includes(user._id) ? isFriend=true :isFriend=false;
                  return <>{
                    loading ? (<UserDataSkeleton/>) : (
                      <Userdata setLoading={setLoading} key={index} isFriend={isFriend} data={user} token={userData.token}/>
                    )
                  }</>
              })}
            </div>
      </div>
    </div>
  )
}

export default Adduser
