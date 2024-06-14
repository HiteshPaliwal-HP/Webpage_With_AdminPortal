import React from 'react'
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from "react";
import { useAuth } from "../store/auth";
export const Login = () => {

  const[user,setuser] = useState({
    email:"",
    password:"",
  });
 
  const handleInput = (e)=>{
    let name = e.target.name;
    let value = e.target.value;
    setuser({
      ...user,[name]:value,
    });
  }
  const navigate = useNavigate();
  const {storeTokenInLS} = useAuth();
  const handleSubmit = async(e)=>{
  
    e.preventDefault();
  //  console.log(user);
    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(user),
      });
      const res_data=await response.json();
      // console.log(res_data);
      if(response.ok){
         //Store data in the local storage
         storeTokenInLS(res_data.token);
        //  localStorage.setItem("token",res_data.token);
        setuser({ username:"",email:"",phone:"",password:""});
        toast.success("Login successfull🥰 ");
        navigate("/");
      }else{
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
      console.log(response);
    } catch (error) {
      console.log("login",error)
    }
   
}

  return <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image regis-form">
             
                <img
                  src="/images/register.png"
                  alt="Regisatration"
                  width="500"
                  height="400"
                />
              </div>
              <div className="registration-form regis-form">
              <h1 className="main-heading mb-3">Login Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div className="input">
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="enter your email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="input">
                    <label htmlFor="password">password</label>
                    <input
                      type="text"
                      name="password"
                      placeholder="password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <br />
                  <button type="sunmit" className="btn btn-submit">Login Now</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
  </>
}


