import React, { useEffect, useState ,useContext,useRef,useMemo} from 'react'
import "./Chatarea.css"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import SelfMessage from '../Message/SelfMessage';
import OtherMessage from '../Message/OtherMessage';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import errorHandling from '../../Utils/errorhandling';
import { myContext } from '../Maincontainer/Maincontainer';
import { io } from "socket.io-client";
import capitalizeFirstLetter from '../../Utils/capitalize';
import Back from '../BackButton/Back';
import SelfMessageSkeleton from '../Skeleton/SelfMessageSkeleton';
import ChatContainerSkeleton from '../Skeleton/ChatContainerSkeleton';
import { toast } from 'react-toastify';

const ENDPOINT = "https://chatappserver-epqb.onrender.com/"
var socket;
// const socket = io(ENDPOINT)
const Chatarea = () => {
  const navigate = useNavigate();
  const [messageContent,setMessageContent] = useState(" ");
  const [allMessage,setAllMessage] = useState([]);
  const [allMessagesCopy,setAllMessagesCopy]=useState([]);
  const[socketConnectionStatus,setSocketConnectionStatus]=useState(false);
  const [groupAdmin,setGroupAdmin]=useState(false);
  const[loading,setLoading]=useState(true);
  const{refresh,setRefresh,sideBarClick,setSideBarClick,setMessageLoading,messageLoading} = useContext(myContext);
  const container = useRef(null);
  const params = useParams();
  const[chat_id,chat_user,groupAdminId,otherUser,isGroup] = params.id.split("&");

  const userData = JSON.parse(localStorage.getItem('userData'));
  if(!userData || !userData?.token){
    navigate('/')
  }


  const config = {headers:{Authorization:`Bearer ${userData?.token}`}};
  

  const sendMessage = async()=>{
      try{
        const resp = await axios.post("https://chatappserver-epqb.onrender.com/message/",{content:messageContent,chatId:chat_id},config); 
        setMessageContent("");
        socket.emit("newMessage",resp)
        setRefresh(!refresh);
        
      }catch(e){
        errorHandling(e,navigate);
      }
  }

  
  const getMessage = async()=>{
    
    try{
      
      const resp = await axios.get("https://chatappserver-epqb.onrender.com/message/"+chat_id,config);
      setAllMessage(resp.data);
      socket.emit("join chat",chat_id);
      setLoading(false);
      setMessageLoading(false);
    }catch(e){
      errorHandling(e,navigate);
    }
  }



  const handleGroupExit=async()=>{
    try{
      setLoading(true);
      const resp = await axios.post("https://chatappserver-epqb.onrender.com/chat/groupexit",{chatId:chat_id,userId:userData._id,otherUser:otherUser},config)
      console.log("clicked on button");
      if(window.document.defaultView.innerWidth<=615){
        navigate("/app");
        setSideBarClick(false);
      }else{
        navigate("/app/adduser")
      }
      setRefresh(!refresh);
      setLoading(false);
      toast.success('Chat Deleted Successfully',{
        position:"top-center",
        autoClose:"1300",
        hideProgressBar:false,
        closeOnClick:true,
        draggable:true,
        progress:undefined,
        theme:"colored"
      })
      
    }catch(e){
      toast.error('Chat Not Deleted',{
        position:"top-center",
        autoClose:"1300",
        hideProgressBar:false,
        closeOnClick:true,
        draggable:true,
        progress:undefined,
        theme:"colored"
      })
      errorHandling(e,navigate);
    }
  }


  const handleGroupDelete=async()=>{
    try{
      setLoading(true);
      const resp = await axios.post("https://chatappserver-epqb.onrender.com/chat/deleteGroup",{chatId:chat_id,otherUser:otherUser},config)
      console.log("delete");
      if(window.document.defaultView.innerWidth<=615){
        navigate("/app");
        setSideBarClick(false);
      }else{
        navigate("/app/adduser")
      }
      setRefresh(!refresh);
      setLoading(false);

      toast.success('Group Deleted Successfully',{
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
      toast.error('Group Not Deleted Successfully',{
        position:"top-center",
        autoClose:"1300",
        hideProgressBar:false,
        closeOnClick:true,
        draggable:true,
        progress:undefined,
        theme:"colored"
      })
      navigate("/app/allgroups")
    }
  }
  
  window.addEventListener('popstate',(e)=>{
    setSideBarClick(false);
  })

  

  const findGroupAdmin=()=>{
      if(groupAdminId===userData._id){
        setGroupAdmin(true);
      }
  }

  useEffect(()=>{
    if(sideBarClick ){
        container.current?.classList.add("show-me");
        container.current?.classList.remove("mobile-container");
    }else if(!sideBarClick){
        container.current?.classList.remove("show-me");
        container.current?.classList.add("mobile-container");
    }

  },[sideBarClick])
  

  // connect to socket
  useEffect(()=>{
    socket=io(ENDPOINT);
    socket.emit("setup",userData);
    socket.on("connection",()=>{
      setSocketConnectionStatus(!socketConnectionStatus);
    })
  },[])
  
  
  useEffect(()=>{
    socket.on("message received",(newMessage)=>{
      if(!allMessagesCopy || allMessagesCopy._id !==newMessage._id){
        
      }else{
        setAllMessage([...allMessage],newMessage)
      }
    })
    
  },[])
  
  useEffect(()=>{
    if(!userData || !userData?.token){
      navigate('/')
      return;
    }
    getMessage()
    findGroupAdmin()
  },[chat_id,userData?.token,refresh,allMessage])

  return (
    <>
    <div ref={container} className='chatarea-container mobile-container'>
      <div className="chatarea-top">
            <div className="sidebar-top-left">
                <div className="sidebar-icon-holder">
                    <AccountCircleOutlinedIcon style={{ fontSize: '25px' }} className='sidebar-icon'/>
                </div>
                <span className="sidebar-profile-name">{capitalizeFirstLetter(chat_user ? chat_user : `Deleted Chat`) }</span>
            </div>
            <div className="sidebar-top-right">
                <div className="sidebar-icon-holder">
                  {(groupAdmin && isGroup==='true') ?  <DeleteForeverOutlinedIcon style={{ fontSize: '25px',color:"red"}} className='sidebar-icon' onClick={handleGroupDelete}/> 
                   : <PersonRemoveOutlinedIcon style={{ fontSize: '25px',color:"red"}} className='sidebar-icon' onClick={handleGroupExit}/>}
  
                </div>
                <Back/>
            </div>
      </div>
      <div className="chatarea-bottom">
      { (messageLoading || loading) ? (
        <ChatContainerSkeleton/>
      ):(
        <div className="chats">
          {
            allMessage.slice(0).reverse().map((message,index)=>{
              const senderId = message.sender._id;
              const selfId = userData._id;
              if(senderId===selfId){
                return <>{ loading ?(
                  <SelfMessageSkeleton/>
                ) : (
                  <SelfMessage time={message?.createdAt} content={message.content}/>)}</>
              }else{
                return <OtherMessage time={message?.createdAt} isGroupM={message?.chat?.isGroupChat} senderName={message.sender.name} content={message.content}/>
              }

            })
          }
        </div>)  
        }
        <div className="message-type-container">
          <input type="text" placeholder='Start Typing...' value={messageContent} className="message-input" onChange={(e)=>{setMessageContent(e.target.value)}}/>
          <div className="send-icon-holder" onClick={sendMessage}>
                <SendOutlinedIcon style={{ fontSize: '41px',padding:'8px' }} className='send-icon '/>
          </div>     
        </div>
      </div>
    </div>
    
    </>

  )
}

export default Chatarea
