
import React, { useEffect } from 'react';
import "./UpdatePost.scss";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import  axios  from 'axios';
import Joi from 'joi';



export default function UpdatePost(props) {
  let userData=  JSON.parse(localStorage.getItem('userData'))
 
const [updatePost, setUpdatePost] = useState(false)
const [errList, setErrList] = useState('')
const [error, setError] = useState('')
const [isloading, setIsloading] = useState(false)
const [addpost, setAddPost] = useState({
  post_id:"",
  content:"",
  
  });

    const getUserData=(e)=>{
    // const MyPost={...addpost};
    addpost['post_id']=props.postId.post_id;
    addpost['content']=e.target.value;
    

    // MyPost['image']=`/${MyPost['image']}`;

    
    console.log(addpost)
    }
    
    function validationPostForm(){

      let schema=Joi.object({
          post_id:Joi.string().min(24).max(24),
          content:Joi.string().min(3).max(200).required(),
          
  
          
        })
    
        // params:joi.object({
        //     Id:joi.string().min(24).max(24).required(),
        // }),
      
     
  
      return schema.validate(addpost, {abortEarly:false})
  
    }

    async function submitPostForm(e){
      e.preventDefault();
      setIsloading(true)
      let {error}= validationPostForm();
      if(error){
        setErrList(error.details)
        setIsloading(false)
        // console.log(error.details)
      }
      else
      {
  
        let token= localStorage.getItem('tkn')
    let {data}=await axios.patch("http://localhost:3001/posts/updatepost",addpost,{headers:{token}})
    console.log(data);
     if(data.message==="success"){
    props.getPosts()
      setIsloading(false);
     }else {
      setError(data.msg);
      setIsloading(false);
     }
      }}
   



  
 return <>


<div className="updatePost">
<div className="post">
      <div className="add">
        <div className='text'>
          <h2>update Post</h2>
          <i className="fa-regular fa-circle-xmark " onClick={()=>(!props.update())}></i>
        </div>
        {error.length>0 ? <div className="alert alert-danger">{error}</div> : "" }

          {errList.length>0 ? errList.map((err,idx)=>
          <div key={idx} className='alert alert-danger'> {err.message}</div>) :''}

        <div className="postInfo">
        <Link to={`/profile/${userData.id}`} style={{textDecoration:"none",color:"inherit"}}>
        <img src={userData.image} alt="userDataImage" />
           </Link>

           
             <form onSubmit={submitPostForm}>
              <textarea  onChange={getUserData} type="text" placeholder="What's on your mind?" name="content" className='form-control mb-2' />
              <button  type='submit' className='btn btn-info rounded-pill w-100'> {isloading === true?
      <div className='fas fa-spin fa-spinner'></div>:"update"}</button>
             </form>
           
        </div>
        <div className="events">
          <span><i className="fa-solid fa-video text-danger  "></i> Life video</span>
          <span ><i className="fa-solid fa-image text-bg-success "> </i> Photo/video</span>
          <span><i className="fa-solid fa-face-smile text-warning "></i>Feeling/activity</span>

        </div>
      {/* <button  onClick={submitPostForm} className='btn btn-info rounded-pill w-100'> {isloading === true?
      <div className='fas fa-spin fa-spinner'></div>:"Post"}</button> */}

        {/* <button className='btn btn-info rounded-pill w-100'>Post</button> */}
      </div>
    </div>
  </div> 


  
  
  

  
  </>
}
