import React, { useEffect, useState ,useContext,useRef} from 'react'
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
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Back from '../BackButton/Back';
import SelfMessageSkeleton from '../Skeleton/SelfMessageSkeleton';

const ENDPOINT = "http://localhost:5000"
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
  const{refresh,setRefresh,sideBarClick,setSideBarClick} = useContext(myContext);
  const container = useRef(null);

  const params = useParams();
  const[chat_id,chat_user,groupAdminId,otherUser] = params.id.split("&");
  const userData = JSON.parse(localStorage.getItem('userData'));
  if(!userData || !userData?.token){
    navigate('/')
  }


  const config = {headers:{Authorization:`Bearer ${userData?.token}`}};
  

  const sendMessage = async()=>{
      try{
        const resp = await axios.post("http://localhost:5000/message/",{content:messageContent,chatId:chat_id},config); 
        setMessageContent("");
        socket.emit("newMessage",resp)
        setRefresh(!refresh);
      }catch(e){
        errorHandling(e,navigate);
      }
  }

  
  const getMessage = async()=>{
    try{
      // setLoading(true);
      const resp = await axios.get("http://localhost:5000/message/"+chat_id,config);
      // console.log(resp ,"all message");
      setAllMessage(resp.data);
      socket.emit("join chat",chat_id);
      setLoading(false);
      
      
    }catch(e){
      errorHandling(e,navigate);
    }
  }

  const handleGroupExit=async()=>{
    try{
      
      const resp = await axios.post("http://localhost:5000/chat/groupexit",{chatId:chat_id,userId:userData._id,otherUser:otherUser},config)
      console.log("clicked on button");
      if(window.document.defaultView.innerWidth<=615){
        navigate("/app");
        setSideBarClick(false);
      }else{
        navigate("/app/adduser")
      }
      setRefresh(!refresh);
      
    }catch(e){
      errorHandling(e,navigate);
    }
  }


  const handleGroupDelete=async()=>{
    try{
      
      const resp = await axios.post("http://localhost:5000/chat/deleteGroup",{chatId:chat_id,otherUser:otherUser},config)
      console.log("delete");
      if(window.document.defaultView.innerWidth<=615){
        navigate("/app");
        setSideBarClick(false);
      }else{
        navigate("/app/adduser")
      }
      setRefresh(!refresh);
      
    }catch(e){
      console.log(e);
      navigate("/app/allgroups")
    }
  }

  

  const findGroupAdmin=()=>{
      if(groupAdminId===userData._id){
        setGroupAdmin(true);
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
    console.log(socketConnectionStatus);
    
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
                  {groupAdmin ?  <DeleteForeverOutlinedIcon style={{ fontSize: '25px',color:"red"}} className='sidebar-icon' onClick={handleGroupDelete}/> 
                   : <PersonRemoveOutlinedIcon style={{ fontSize: '25px',color:"red"}} className='sidebar-icon' onClick={handleGroupExit}/>}
  
                </div>
                <Back/>
            </div>
      </div>
      <div className="chatarea-bottom">
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
                return <OtherMessage time={message?.createdAt} isGroupM={message.chat.isGroupChat} senderName={message.sender.name} content={message.content}/>
              }

            })
          }
        </div> 
        <div className="message-type-container">
          <input type="text" placeholder='Start Typing...' value={messageContent} className="message-input" onChange={(e)=>{setMessageContent(e.target.value)}}/>
          <div className="send-icon-holder" onClick={sendMessage}>
                <SendOutlinedIcon style={{ fontSize: '41px',padding:'8px' }} className='send-icon '/>
          </div>     
        </div>
      </div>
    </div>
  )
}

export default Chatarea