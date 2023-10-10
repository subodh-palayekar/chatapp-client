import React, { useState } from 'react'
import "./login.css"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import welcomeImg from "../../Assets/welcomeImg.png";
import axios from 'axios';

const Login = () => {
  
  const navigate = useNavigate();
  const [formData,setFormData] = useState({});
  const [loading,setLoading] = useState(false);

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const config = {headers:{"Content-type":"application/json"},}

  const handleLogin=async (e)=>{
    setLoading(true);
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:5000/user/login",formData,config);
      console.log(response);
      navigate("/app/welcome")
      alert('login successfully')
      localStorage.setItem("userData",JSON.stringify(response.data))
      setLoading(false)
    } catch (error) {
      console.log(error);
      alert(error.response.data.message)
      setLoading(false)
    }

  }
  return (
    <div className='login-container'>
      <div className="login-left">
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
          <button type='submit' className="login-btn">Login</button>
        </form>
        <span className="login-bottom-text">Don't Have Account? <Link className="link-text" to="/register"> Create Account</Link> </span>
      </div>
      <div className="login-right">
        <img src={welcomeImg} alt="welcome" />
      </div>
    </div>
  )
}

export default Login
