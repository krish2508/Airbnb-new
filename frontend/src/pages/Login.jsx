import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess} from '../utils';
import { Link, useNavigate } from "react-router-dom";
import './Login.css'
const Login = () => {
  let [loginInfo,setLoginInfo]=useState({email:"",password:""});
  const handleChange=(e)=>{
    const {name,value}=e.target;
    const info={...loginInfo};
    info[name]=value;
    setLoginInfo(info);
  }
  const navigate = useNavigate();

  const handleSubmit=async (e)=>{
    e.preventDefault();
    const{email,password}=loginInfo;
    if(!email||!password){
      return handleError('email and password are required');
    }
    try {
      const loginUrl="http://localhost:3000/login";
      let response=await fetch(loginUrl,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        credentials: 'include',
        body:JSON.stringify(loginInfo),
      })
      const result= await response.json();
      const {success,message,error,jwtToken,name,role}=result;
      if(success){
        handleSuccess(message);
        // localStorage.setItem('token',jwtToken);
        // localStorage.setItem('loggedinuser',name);
        // localStorage.setItem('role',role);
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      }
      else if(error){
        let det=error.details[0].message;
        handleError(det);
      }
      else if(!success){
        handleError(message);
      }
    } catch (error) {
     handleError(error);
    }
  }
  return (
    <div className="Login">
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">email</label>
          <input type="email" name="email" placeholder="enter the email" onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password" name="password" placeholder="enter the password" onChange={handleChange}/>
        </div>
        <button type="submit">Login</button>
        <br/>
        <span> Doesn't have an account
          <Link to='/signup'>signup</Link>
        </span>
      </form>
      <ToastContainer />
      </div>
    </div>

  );
};
export default Login;