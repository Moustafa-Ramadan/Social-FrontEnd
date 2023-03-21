import React, { useState } from 'react'
import "./DeleteAccount.scss";
import joi from 'joi';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function DeleteAccount(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [errDetails, setErrDetails] = useState([]);
 const [errList, seterrList] = useState("");
 const [user, setUser] = useState({
  password:"",
  
  });

 function GetUser(e){
  let myUser={...user};
myUser[e.target.name]=e.target.value;
setUser(myUser);

  console.log(myUser);
 }

 function validationRegisterForm(){

  let schema=
    joi.object({
      password:joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
  
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
    console.log(token)
let {data}=await axios.post("http://localhost:3001/users/deleteuser",user,{headers:{token}})
console.log(data);
 if(data.message==="success"){
  setInterval(() => {
    props.logout()
  }, 2000);
  
setIsLoading(false);
 }else {

  seterrList(data.msg);
  setIsLoading(false);
 }
  }}
  return <>
   <div className="DeleteAccount">
  <div className="container">
<div className='formData '>
{errList.length>0?<div className='alert alert-danger'>{errList}</div>:""}
{errDetails.map((err,idx)=><div key={idx} className='alert alert-danger'> {err.message}</div>)}  
  <form onSubmit={submitRegisterForm} >
    <input type="password" onChange={GetUser} placeholder='Enter Your Password' name='password' className='form-control mb-4' required />

    <button type='submit' className='form-control btn btn-outline-danger mb-3'>{isLoading===true?<div className='fas fa-spinner fa-spin'></div>:'Delete'}</button>


  </form>
  </div>
  </div>
  </div>

  
  </>
}




