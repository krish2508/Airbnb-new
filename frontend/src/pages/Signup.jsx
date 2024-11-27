import React from 'react';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess} from '../utils';
import { Link, useNavigate } from "react-router-dom";
import './Signup.css'
const Signup = () => {
  let [signupInfo,setsignupInfo]=useState({name:"",email:"",password:"",role:""});
  const handleChange=(e)=>{
    const {name,value}=e.target;
    const info={...signupInfo};
    info[name]=value;
    setsignupInfo(info);
  }
  const navigate = useNavigate();
  const handleSubmit=async (e)=>{
    e.preventDefault();
    const{name,email,password}=signupInfo;
    if(!name||!email||!password){
      return handleError('name, email and password are required');
    }
    try {
      const signUrl="http://localhost:3000/signup";
      let response=await fetch(signUrl,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(signupInfo),
      })
      const result= await response.json();
      const {success,message,error}=result;
      if(success){
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login');
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
    <div className="Signup">
    <div className="container">
    <h1>Signup</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">NAME</label>
        <input type="text" name="name" autoFocus placeholder="enter the name" onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="email">email</label>
        <input type="email" name="email" placeholder="enter the email" onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input type="password" name="password" placeholder="enter the password" onChange={handleChange}/>
      </div>
      <div>
          <label htmlFor="role">ROLE</label>
          <select name="role" onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="owner">Owner</option>
            <option value="customer">Customer</option>
          </select>
        </div>
      <button type="submit">SignUP</button>
      <br/>
      <span> Already have an account
        <Link to='/login'>login</Link>
      </span>
    </form>
    <ToastContainer />
  </div>
  </div>
  );
};

export default Signup;