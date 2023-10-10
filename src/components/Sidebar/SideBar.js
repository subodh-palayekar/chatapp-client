import React, { useEffect, useState ,useContext,useRef} from 'react'
import "./SideBar.css"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import PreviewMessage from '../Message/PreviewMessage';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import errorHandling from '../../Utils/errorhandling';
import { myContext } from '../Maincontainer/Maincontainer';
import PrevMessSkeleton from '../Skeleton/PrevMessSkeleton';

const SideBar = () => {
    const navigate = useNavigate();
    const [conversations,setConversations]=useState([]);
    const [loading,setLoading] = useState(true);
    const sidebarContainer = useRef(null);
    const{ refresh,sideBarClick,setSideBarClick} = useContext(myContext)
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
        console.log("person trying to access welcome page without login , localstorage userdata not save");
        navigate('/')
    } 

    const config = { headers:{Authorization:`Bearer ${userData?.token}`}};
 
    const fetchConversation = async()=>{
        try{
            setLoading(true);
            const resp = await axios.get("http://localhost:5000/chat/",config);
            setConversations(resp.data)
            setLoading(false);
        }catch(e){
            errorHandling(e,navigate);
        }
    }

    const handleClick=(path)=>{
        if(path==='welcome' && window.document.defaultView.innerWidth<=615 ){
            navigate('/app')

        }else{
            navigate(path)
            if(window.document.defaultView.innerWidth<=615){
                setSideBarClick(true);
                sidebarContainer.current?.classList.toggle("click")
                console.log(sideBarClick);
            }
        }
    }    

    useEffect(()=>{
        if(!sideBarClick){
            sidebarContainer.current?.classList.remove("click")
        }
    },[sideBarClick])
      

    const handleLogout=()=>{
        localStorage.clear("userData");
        navigate("/")
    }
    useEffect( ()=>{ 
        setTimeout(() => {
            fetchConversation();
        }, 500);
    },[refresh,sideBarClick])




  return (
    <div ref={sidebarContainer} className="sidebar-container">
        <div className="sidebar-top">
            <div className="sidebar-top-left"> 
                <div className="sidebar-icon-holder profile" onClick={()=>{handleClick("welcome")}}>
                    <AccountCircleOutlinedIcon style={{ fontSize: '25px' }} className='sidebar-icon'/>
                </div>
                {/* <span className="sidebar-profile-name">{userData.name}</span> */}
            </div>
            <div className="sidebar-top-right">
                <div className="sidebar-icon-holder" onClick={()=>{handleClick("adduser")}}>
                   <PersonAddAltOutlinedIcon style={{ fontSize: '25px' }} className='sidebar-icon'/>
                </div>
                <div className="sidebar-icon-holder" onClick={()=>{handleClick("allgroups")}}>
                    <GroupsOutlinedIcon style={{ fontSize: '25px' }} className='sidebar-icon'/>
                </div>
                <div className="sidebar-icon-holder" onClick={()=>{handleClick("creategroup")}} >
                    <GroupAddOutlinedIcon style={{ fontSize: '25px' }} className='sidebar-icon'/>
                </div>
                <div className="sidebar-icon-holder" onClick={handleLogout}>
                    <LogoutOutlinedIcon style={{ fontSize: '25px' }} className='sidebar-icon'/>
                </div>
            </div>
        </div>
        <div className="sidebar-bottom">
            <div className="search-container">
                <input type="text" placeholder='Search' className="search" />     
                    <SearchOutlinedIcon className='search-icon'/>
            </div>
            <div className="prev-message-container">
                { conversations.map((conversation,index)=>{
                    var chatName = "";
                    if(conversation.isGroupChat){
                        chatName=conversation.chatName;
                    }else{
                        conversation.users.map((user)=>{
                            if(user._id!=userData._id){
                                chatName = user.name
                            }
                        })
                    } 
                    return (<>
                    {loading ? (
                            <PrevMessSkeleton/> 
                            ): (
                            <PreviewMessage sidebarContainer={sidebarContainer}  data={conversation} chatName={chatName}/>
                    )}
                        </>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default SideBar
