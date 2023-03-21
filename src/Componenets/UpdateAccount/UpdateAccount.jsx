import React, { useState } from 'react'
import "./UpdateAccount.scss";
import joi from 'joi';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
export default function UpdateAccount(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [errDetails, setErrDetails] = useState([]);
  let navigation=useNavigate()
 const [errList, seterrList] = useState("");
 const [user, setUser] = useState({
  oldEmail:"",
   email:"",
   password:""
  });

 function GetUser(e){
  let myUser={...user};
myUser[e.target.name]=e.target.value;
setUser(myUser);
setErrDetails([])
  console.log(myUser);
 }

  function validationRegisterForm(){

    let schema=
      joi.object({
        oldEmail:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
          password:joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    
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
  let {data}=await axios.patch("http://localhost:3001/users/updateAccount",user,{headers:{token}})
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
 

  <div className="UpdateAccount">
  <div className="container">
  
<div className='formData '>
{errList.length>0?<div className='alert alert-danger'>{errList}</div>:""}
{errDetails.map((err,idx)=><div key={idx} className='alert alert-danger'> {err.message}</div>)}  
  <form onSubmit={submitRegisterForm} >
  <input type="email" onChange={GetUser}  placeholder='Enter  old Email' name='oldEmail' className='form-control mb-4' required />
  <input type="email" onChange={GetUser}  placeholder='Enter  new Email' name='email' className='form-control mb-4' required />
    <input type="password" onChange={GetUser} placeholder='Enter Your Password' name='password' className='form-control mb-4' required />

    <button type='submit' className='form-control btn btn-outline-success mb-3'>{isLoading===true?<div className='fas fa-spinner fa-spin'></div>:'Update'}</button>


  </form>
  </div>
  </div>
  </div>


 
  
  
  </>
}