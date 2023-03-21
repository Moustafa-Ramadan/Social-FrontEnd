import React from 'react'
import "./Createpost.scss"
// import img1 from '../../images/IMG_6387.JPG';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Joi from 'joi';
import axios from 'axios';



export default function Posts({getPosts}) {

  let userData=  JSON.parse(localStorage.getItem('userData'))
      
 
const [createPost, setCreatePost] = useState(false)
let navigation=useNavigate()
const [errList, setErrList] = useState('')
const [error, setError] = useState('')
const [isloading, setIsloading] = useState(false)
const [addpost, setAddPost] = useState({
  content:"",
  image:"",
  });

  const [postimage, setPostImage] = useState("");
  
  const [content, setContent] = useState("");


  const getUserData=(e)=>{
    
    // setContent( e.target.value);
    // MyPost['image']=`/${MyPost['image']}`;

    addpost['content']=e.target.value
    }
    
 

  const getpostData=(e)=>{
    const file = e.target.files[0];

    TransformFileData(file);
  
    console.log(addpost)
    console.log(file)
    }
    
    console.log(content)
    addpost['image']=postimage
  // const getpostData=(e)=>{
  //   const MyPost={...addpost};

  //   MyPost['content']=e.target.value;
    
  //   MyPost['image']=e.target.files[0].name;
   
  //   setErrList([])  
  //   // MyPost['image']=`/${MyPost['image']}`;

  //   setAddPost(MyPost)
 

    
  //   }


    const TransformFileData = (file) => {
      const reader = new FileReader();
  
      if (file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPostImage(reader.result);
          console.log(reader.result)
          // addpost['image']=postimage
        };
      } else {
        setPostImage("");
      }
    };
   
  //validation form
  
    function validationPostForm(){

    let schema=Joi.object({
      content:Joi.string().min(3).max(200),
      post_id:Joi.string().min(24).max(24),
      createdBy:Joi.string().min(24).max(24),
      image:Joi.string(),
        
      })
  
      // params:joi.object({
      //     Id:joi.string().min(24).max(24).required(),
      // }),
    
   

    return schema.validate(addpost, {abortEarly:false})

  }

//   function submit (e){
//     e.preventDefault();
//     setIsloading(true)
//     const data=new FormData();
// data.append('file',image)
// data.append('upload_preset','uz3cifkv')
// data.append('cloud_name','dtm4kmm5s')

//  axios.post("https://api.cloudinary.com/v1_1/dtm4kmm5s/image/upload",data).then((res)=>res.json()).then((data)=>{
//   console.log(data);
//  }).catch((err)=>{
//   console.log(err);
//  })
// // let {data}=await axios.post("cloudinary://273764512386596:j7n1Anjf0axpKeHnAeX1smcAk0U@dtm4kmm5s",formData)



// console.log(data)
//   }

   //addpost
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
// const formData=new FormData();
// formData.append('image',addpost)
// // formData.append('content',addpost)




//  console.log(formData)
// // formData.append('name',)

      let token= localStorage.getItem('tkn')
  let {data}=await axios.post("http://localhost:3001/posts/addpost",addpost,{headers:{token}})
 
   if(data.message==="success"){
  setCreatePost(!createPost)
   getPosts()
    navigation('/')
    setIsloading(false);
   }else {
    setError(data.msg);
    setIsloading(false);
   }
    }}
 

  
 return <>


  <div className="createPost">
    <div className="container">
      <div className='post'>
        <div className="postInfo">
        <Link to={`/profile/${userData.id}`} style={{textDecoration:"none",color:"inherit"}}>
         <img src={userData.image} alt="userDataImage" />
           </Link>
             <form>
              <input type="text" placeholder="What's on your mind?" className='form-control rounded-pill' onClick={()=>setCreatePost(!createPost)} />
             </form>
           
        </div>
        <div className="events">
          <span><i className="fa-solid fa-video text-danger "></i> Life video</span>
          <span onClick={()=>setCreatePost(!createPost)}><i className="fa-solid fa-image text-bg-success"></i> Photo/video</span>
          <span><i className="fa-solid fa-face-smile text-warning"></i>Feeling/activity</span>

        </div>
      </div>
    </div>
  </div>
  {createPost && <div className="addPost">
    <div className="post">
      <div className="add">
        <div className='text'>
          <h2>Create Post</h2>
          <i className="fa-regular fa-circle-xmark " onClick={()=>setCreatePost(!createPost)}></i>
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
              <input onChange={getpostData} type="file" placeholder='upload image' name="image" className='form-control w-50 mb-2' />

              <button  type='submit' className='btn btn-info rounded-pill w-100'> {isloading === true?
      <div className='fas fa-spin fa-spinner'></div>:"Post"}</button>
             </form>
             <div className="imagePerview">{postimage ? (
          <>
            <img src={postimage} alt="error!" />
          </>
        ) : (
          <p>Product image upload preview will appear here!</p>
        )}</div>
           
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
  </div>}
  
  
  

  
  </>
}
