import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Login.scss"
import Joi from 'joi'
import axios from 'axios'
import { AuthenticationContext } from './../../Context/AuthContext ';
import Button from 'react-bootstrap/Button';
 import Modal from 'react-bootstrap/Modal';

export default function Login(props) {
  let navigation=useNavigate()
  const [errList, setErrList] = useState('')
  const [error, setError] = useState('')
  const [isloading, setIsloading] = useState(false)
  // const {saveUserData}=useContext(AuthenticationContext)

  
//=>login
const [user, setUser] = useState({
  email:'',
  password:'' ,
 
})

const getUserData=(e)=>{
const MyUser={...user};
MyUser[e.target.name]=e.target.value;
setUser(MyUser)
setError([])
    setErrList([])
}
console.log(user)

function validateRegisterForm(){
const schema=Joi.object({
  
  email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password:Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
  
})
return schema.validate(user,{abortEarly:false})
}

async function submitRegisterForm(e){
e.preventDefault()
setIsloading(true)
const {error}=validateRegisterForm()
if(error){
setErrList(error.details)
setIsloading(false)

}
else
{
  const {data}= await axios.post(`http://localhost:3001/users/Signin`,user)
  if(data.message=== 'success'){
setIsloading(false)
localStorage.setItem('tkn',data.token)
props.saveUserData()
navigation('/')
  }
  else
  {
    setError(data.msg)
    setIsloading(false)

  }
}
 
}


//2=> forget password

const [show, setShow] = useState(false);
const [activationCode, setActivationCode] = useState(false);
const [email, setEmail] = useState({
  email:""
});

const [datauser, setDataUser] = useState({
  email:"",
  password:"",
  acode:""
});


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getUserEmail=(e)=>{
    const MyUser={...email};
    MyUser[e.target.name]=e.target.value;
    setEmail(MyUser)
    setError([])
    setErrList([])
    }
   

  //send Activation Code
async function sendActivationCode(e){
  e.preventDefault()
  setIsloading(true)
    const {data}= await axios.post(`http://localhost:3001/users/activationCode`,email)
    if(data.message=== 'success'){
      console.log(data)
  setIsloading(false)
  setActivationCode(true)
  
    }
    else
    {
      setError(data.msg)
      setIsloading(false)
  
    }
  
   
  }


  //reset password

  const getdata=(e)=>{
    const MyUser={...datauser};
    MyUser[e.target.name]=e.target.value;
    setDataUser(MyUser)
    setError([])
    setErrList([])
    console.log(datauser)
    }
    console.log(datauser)
function validateDataForm(){
  const schema=Joi.object({
    
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
    acode:Joi.string()
    
  })
  return schema.validate(datauser,{abortEarly:false})
  }
  
  
  async function resetPassword(e){
  e.preventDefault()
  setIsloading(true)
  const {error}=validateDataForm()
  if(error){
  setErrList(error.details)
  setIsloading(false)
  
  }
  else
  {
    const {data}= await axios.patch(`http://localhost:3001/users/forgetpassword`,datauser)
    
     if(data.message=== 'success'){
  setIsloading(false)
  handleClose()
    }
    else
    {
      setError(data.msg)
      setIsloading(false)
  
    }
  }
   
  }


return <>
<div className="Login  mx-auto">

 <div className="card1 row">
     <div className="left1 col-sm-6">
     <h1>Hallo world</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe quos a quas praesentium quasi placeat minima asperiores vitae reprehenderit fuga.</p>
<span>Don't you have an account?</span>
<Link to="/signup">
<button>Register</button>
</Link>
<a className='text-info ' onClick={handleShow}>Forgotten password?</a>

<Modal className='Modal  mt-5' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >Find Your Account</Modal.Title>
        </Modal.Header>
       
        <Modal.Body >
         
        {error.length>0 ? <div className="alert alert-danger">{error}</div> : "" }
             {errList.length>0 ? errList.map((err,idx)=>
             <div key={idx} className='alert alert-danger'> {err.message}</div>) :''}
{activationCode === true?<form className='d-flex flex-column justify-content-center' onSubmit={resetPassword}>
                <p>Please enter your email address,activation Code and new password  to reset your account.</p>
                <input type="email" onChange={getdata} placeholder='Email' className='form-control mb-3' name='email'/>
                <input type="password" onChange={getdata} placeholder='Password'className='form-control mb-3'  name='password' />
                <input type="text" onChange={getdata} placeholder='Activation Code'className='form-control mb-3'  name='acode' />
                <button  type='submit' className='btn btn-info rounded-pill '> {isloading === true?
                  <i  className='fas fa-spin fa-spinner'></i>:"Reset"}</button>
              </form> 
: <form  className='d-flex flex-column justify-content-center' onSubmit={sendActivationCode}>
             
              
<p>Please enter your email address to search for your account.</p>
 <input type="email" onChange={getUserEmail} placeholder='Email' className='form-control mb-3' name='email'/>

 <button  type='submit' className='btn btn-info rounded-pill '> {isloading === true?
  <i  className='fas fa-spin fa-spinner'></i>:"send"}</button>
</form>}
           

        

         
        </Modal.Body>
       
        <Modal.Footer className='d-flex justify-content-center'>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="success" onClick={handleClose}>
            Update
          </Button> */}
        </Modal.Footer>
      </Modal>

     </div>
     <div className="right1 col-sm-6"> 
     <h1>Login</h1>
        {error.length>0 ? <div className="alert alert-danger">{error}</div> : "" }
                
        {errList.length>0 ? errList.map((err,idx)=>
        <div key={idx} className='alert alert-danger'> {err.message}</div>) :''}

      <form onSubmit={submitRegisterForm} >
      <input type="email" onChange={getUserData} placeholder='Email' className='form-control' name='email'/>
      <input type="password" onChange={getUserData} placeholder='Password'className='form-control'  name='password' />
      <button type='submit'> {isloading === true?<div className='fas fa-spin fa-spinner'></div>:"Login"}</button>
  </form>
  
  
  
     </div>
 </div>
</div>
</>}
