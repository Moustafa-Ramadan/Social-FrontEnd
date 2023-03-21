import React, { useState } from 'react'
import "./ChangePassword.scss";
import joi from 'joi';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
export default function ChangePassword(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [errDetails, setErrDetails] = useState([]);
  let navigation=useNavigate()
 const [errList, seterrList] = useState("");
 const [user, setUser] = useState({
  oldpassword:'',
  password:'',
  repassword:''
   
   });

 function GetUser(e){
  let myUser={...user};
myUser[e.target.name]=e.target.value;
setUser(myUser);
setErrDetails([])
 }

  function validationRegisterForm(){

    let schema=
      joi.object({
          oldpassword:joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
          password:joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
          repassword:joi.ref('password'),
    
      })
  
      // params:joi.object({
      //     Id:joi.string().min(24).max(24).required(),
      // }),
    
   

    return schema.validate(user , {abortEarly:false})

  }
  
  async function submitRegisterForm(e){
    e.preventDefault();
    setIsLoading(true);
    let {error}= validationRegisterForm();
    if(error){
      setErrDetails(error.details);
      setIsLoading(false);
      console.log(error.details)
    }
    else
    {
      let token= localStorage.getItem('tkn')
  let {data}=await axios.patch("http://localhost:3001/users/changepassword",user,{headers:{token}})
  console.log(data);
   if(data.message==="success"){
    props.logout()
  setIsLoading(false);
   }else {

    seterrList(data.msg);
    setIsLoading(false);
   }
    }
  
  
   }
  
  
  return <>
 <div className="ChangePassword">
 <div className="container">
  
  <div className='formData'>
  {errList.length>0?<div className='alert alert-danger'>{errList}</div>:""}
  {errDetails.map((err,idx)=><div key={idx} className='alert alert-danger'> {err.message}</div>)}  
    <form onSubmit={submitRegisterForm} >
      <input type="password" onChange={GetUser} placeholder='Enter  old Password' name='oldpassword' className='form-control mb-4' required />
      <input type="password" onChange={GetUser} placeholder='Enter  New Password' name='password' className='form-control mb-4' required />
      <input type="password" onChange={GetUser} placeholder=' Repeat Password' name='repassword' className='form-control mb-4' required />
  
      <button type='submit' className='form-control btn btn-outline-success mb-3'>{isLoading===true?<div className='fas fa-spinner fa-spin'></div>:'Save'}</button>
  
  
    </form>
    </div>
    </div>
 </div>

  
  

 
  
  
  </>
}

