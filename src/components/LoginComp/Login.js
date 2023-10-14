import React, { useState } from 'react'
import "./login.css"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import welcomeImg from "../../Assets/welcomeImg.png";
import axios from 'axios';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import Logo from "../../Assets/logo.png"

const Login = () => {
  
  const navigate = useNavigate();
  const [formData,setFormData] = useState({});
  const [loading,setLoading] = useState(false);

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value.toLowerCase()})
  }
  const config = {headers:{"Content-type":"application/json"},}

  const handleLogin=async (e)=>{
    setLoading(true);
    try {
      e.preventDefault();
      const response = await axios.post("https://chatappserver-epqb.onrender.com/user/login",formData,config);
      console.log(response);
      navigate("/app/welcome")
      localStorage.setItem("userData",JSON.stringify(response.data))
      setLoading(false)
      toast.success('Login Successfully',{
        position:"top-center",
        autoClose:"1300",
        hideProgressBar:false,
        closeOnClick:true,
        draggable:true,
        progress:undefined,
        theme:"colored"
      })
      
    } catch (error) {
      toast.error(error.response.data.message,{
        position:"top-center",
        autoClose:"1300",
        hideProgressBar:false,
        closeOnClick:true,
        draggable:true,
        progress:undefined,
        theme:"colored"
      })
      setLoading(false)
    }

  }
  return (
    <div className='login-container'>
      <div className="login-left">
        <img className='logo' src={Logo}></img>
        <span className="login-heading">Welcome Back</span>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-container">
            <input type="text" name='username' placeholder='Username'  required className="login-username" onChange={handleChange} />     
            <AccountCircleOutlinedIcon className='iconp'/>
          </div>
          <div className="input-container">
          <input type="password"  name='password' placeholder='Password' required className="login-password" onChange={handleChange} />      
            <LockOutlinedIcon className='iconp'/>
          </div>
          {
            loading ? (
              <button  className="login-btn"><CircularProgress sx={{color:'#6c28f4'}}/></button>
            ):(
              <button type='submit' className="login-btn">Login</button>
            )
          }
        </form>
        <span className="login-bottom-text">Don't Have Account? <Link className="link-text" to="/register"> Create Account</Link> </span>
        <span className='credits'>Developed By <a target='_blank' href='https://github.com/subodh-palayekar'>Subodh Palayekar</a>❤️</span>
      </div>
      <div className="login-right">
        <img src={welcomeImg} alt="welcome" />
      </div>
    </div>
  )
}

export default Login
