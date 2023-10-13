import React, { useState } from 'react'
import "./Register.css"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { Link, useNavigate } from 'react-router-dom';
import welcomeImg from "../../Assets/welcomeImg.png";
import axios from 'axios';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import Logo from "../../Assets/logo.png"

const Register = () => {

  const navigate = useNavigate();
  const [formData,SetFormData] = useState({});
  const [loading,setLoading] = useState(false);

  const handleChange=(e)=>{
    SetFormData({...formData,[e.target.name]:e.target.value.toLowerCase()})
  }

  const config = { headers:{"Content-type":"application/json"},}

  const handleRegister= async(e)=>{
    setLoading(true);
    try {
      e.preventDefault()
        const response = await axios.post('https://chatappserver-epqb.onrender.com/user/register',formData,config);
        console.log(response);
        navigate("/")
        setLoading(false);
        toast.success('Register Successfully',{
          position:"top-center",
          autoClose:"1300",
          hideProgressBar:false,
          closeOnClick:true,
          draggable:true,
          progress:undefined,
          theme:"colored"
        })
        
      } catch (error) {
        toast.error(error.response.data?.message,{
          position:"top-center",
          autoClose:"1300",
          hideProgressBar:false,
          closeOnClick:true,
          draggable:true,
          progress:undefined,
          theme:"colored"
        })
        setLoading(false);
      }
      
  } 



  return (
    <div className='register-container'>
      <div className="register-left">
        <span className="register-heading">Create Account</span>
        <form onSubmit={handleRegister} className="register-form">
          <div className="input-container">
            <input type="text" name="name" placeholder='Name' required className="register-username" onChange={handleChange} />     
            <AccountCircleOutlinedIcon className='iconp'/>
          </div>
          <div className="input-container">
            <input type="text" name="username" placeholder='Username' required className="register-username" onChange={handleChange} />     
            <AccountCircleOutlinedIcon className='iconp'/>
          </div>
          <div className="input-container">
            <input type="email" name='email' placeholder='Email' required className="register-username" onChange={handleChange} />     
            <MailOutlineOutlinedIcon className='iconp'/>
          </div>
          <div className="input-container">
          <input type="password" name='password' placeholder='Password' required className="register-password" onChange={handleChange}/>      
            <LockOutlinedIcon className='iconp'/>
          </div>
          {
            true ? (
              <button  className="register-btn"><CircularProgress sx={{color:'#6c28f4',backgroundColor:'transparent'}}/></button>
            ):(
              <button type='submit' className="register-btn">Register</button>
            )
          }
          
        </form>
        <span className="register-bottom-text">Already Have Account? <Link className='link-text' to='/'>Login</Link> </span>
      </div>
      <div className="register-right">
      <img src={welcomeImg} alt="welcome" />
      </div>
    </div>
  )
}

export default Register
