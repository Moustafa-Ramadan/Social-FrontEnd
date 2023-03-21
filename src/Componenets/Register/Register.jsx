import  axios  from 'axios'
import React,{ useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import "./Register.scss"
import Joi from 'joi'


export default function Register() {

  let navigation=useNavigate()
  const [errList, setErrList] = useState('')
  const [error, setError] = useState('')
  const [isloading, setIsloading] = useState(false)


const [user, setUser] = useState({

  name:'' ,
  email:'',
  password:'' ,
  repassword:'',
  age:0   ,
  phone:''
})

const getUserData=(e)=>{
const MyUser={...user};
MyUser[e.target.name]=e.target.value;
setUser(MyUser)
}


function validateRegisterForm(){
const schema=Joi.object({
  name:Joi.string().min(3).max(15).required(),
  email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password:Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
  repassword:Joi.ref('password'),
  age:Joi.number().min(16).max(60).required(),
  phone:Joi.string().pattern(/^(02)?[0-9]{11}/).required(),
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
  const {data}= await axios.post(`http://localhost:3001/users/Signup`,user)
  console.log(data)
  
  if(data.message=== 'success'){
setIsloading(false)
navigation('/login')
  }
  else
  {
    setError(data.msg)
    setIsloading(false)

  }
}

}

  return <>
    <div className="Register">
    <div className="card1 row">
        <div className="right1 col-sm-6">
        <h1>Lama Social.</h1>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe quos a quas praesentium quasi placeat minima asperiores vitae reprehenderit fuga.</p>
<span>Do you have an account?</span>
<Link to="/login">
<button>Login</button>
</Link>

        </div>
        <div className="left1 col-sm-6">
        <h1>Register</h1>
        {error.length>0 ? <div className="alert alert-danger">{error}</div> : "" }
        {errList.length>0 ? errList.map((err,idx)=>
        <div key={idx} className='alert alert-danger'> {err.message}</div>) :''}
           {/* {errList.length>0? errList.map((err,idx)=>(idx===1? <div key={idx} className='alert alert-danger'>password invalid</div> 
        : <div key={idx} className='alert alert-danger'> {err.message}</div>)):''}  */}

      <form onSubmit={submitRegisterForm} >
      <input type="text" onChange={getUserData} placeholder='UserName' className='form-control' name='name' />
      <input type="email" onChange={getUserData} placeholder='Email' className='form-control' name='email'/>
      <input type="password" onChange={getUserData} placeholder='Password'className='form-control'  name='password' />
      <input type="password" onChange={getUserData} placeholder='Repassword'className='form-control'  name='repassword' />
      <input type="number" onChange={getUserData} placeholder='Age' className='form-control' name='age' />
      <input type="text" onChange={getUserData} placeholder='Phone' className='form-control'  name='phone'/>
      <button type='submit'> {isloading === true?<div className='fas fa-spin fa-spinner'></div>:"Register"}</button>
      </form>
        </div>
    </div>
   </div>
  </>
}
