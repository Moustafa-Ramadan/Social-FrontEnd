import React, { useContext } from 'react'
import "./Profile.scss"
import Posts from './../Posts/Posts';
import { useState } from 'react';
import  Axios  from 'axios';
import { useEffect } from 'react';
import UpdatePost from './../UpdatePost/UpdatePost';
import { Link, useParams } from 'react-router-dom';
import Comments from './../Comments/Comments';
import { userCommunityContext } from './../../Context/UserCommunitycontext';
import getfriendRequests from '../RightBar/RightBar'
 import Button from 'react-bootstrap/Button';
 import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
export default function Profile(props) {
  //use params to show the profile's user
const userId = useParams().id

  let userData=  JSON.parse(localStorage.getItem('userData'))
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState([])
  const {getuserCommunityData}=useContext(userCommunityContext)
  const [commentShow, setCommentShow] = useState(false)
  const [editShow, setEditShow] = useState(false)
  const [update, setUpdate] = useState(false)
  const [id, setid] = useState("")
  const [followSuserId, setFollowSUserId] = useState({
    userId:""
  })

  const [followStatus, setFollowStatus] = useState(false)
  const [friendStatus, setFriendStatus] = useState([])

//1=>get all posts
 
  async function getPosts(){
    let token= localStorage.getItem('tkn')
    const{data}=await Axios.get(`http://localhost:3001/users//userProfile/${userId}`,{headers:{token}})
    setPosts(data.userPosts)
    setUser(data.user)

    console.log(data)
  }
  // 
 

    //2=>show Comments  
      const showComments=(id)=>{
        setCommentShow(!commentShow);
        setid(id)
      
       };
      
       //3=>update Post 
       const updatePost=()=>{
        setUpdate(!update)
        setEditShow(!editShow)
       }
      
       //4=>follow 
      async function follow(){
        let token= localStorage.getItem('tkn')
        followSuserId["userId"]=userId
        console.log(followSuserId);
        const{data}=await Axios.post(`http://localhost:3001/users/sendFollow`,followSuserId,{headers:{token}})
        console.log(data);
        Status()
       }

       //5=>follow Status
       async function Status(){
        let token= localStorage.getItem('tkn')
        followSuserId["userId"]=userId
        console.log(followSuserId);
        const{data}=await Axios.post(`http://localhost:3001/users/followStatus`,followSuserId,{headers:{token}})
        console.log(data);
        if(data.followStat=== true){
          setFollowStatus(true)
        }
      }
       
       //5=>friend Status
       async function showFriendStatus(){
        let token= localStorage.getItem('tkn')
        followSuserId["userId"]=userId
        console.log(followSuserId);
        const{data}=await Axios.post(`http://localhost:3001/users/friendsStatus`,followSuserId,{headers:{token}})
        console.log(data);
        
        setFriendStatus(data)
        
      }

       //6=>send friendRequest
       async function friendRequest(){
        let token= localStorage.getItem('tkn')
        followSuserId["userId"]=userId
        console.log(followSuserId);
        const{data}=await Axios.post(`http://localhost:3001/users/friendRequest`,followSuserId,{headers:{token}})
        console.log(data);
        showFriendStatus()
        getuserCommunityData()
        getfriendRequests()
       }
//7=> update profile picture      
 const [show, setShow] = useState(false);
 const [postimage, setPostImage] = useState("");
 const [errList, setErrList] = useState('')
const [error, setError] = useState('')
const [isloading, setIsloading] = useState(false)

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
 


   const getuserData=(e)=>{
    // const file = e.target.files[0];
setPostImage(e.target.files[0])
    // TransformFileData(file);
    // setError('');
    
    }
    // addpost['image']=postimage
    console.log(postimage)
    
    
    const TransformFileData = (file) => {
      const reader = new FileReader();
  
      if (file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPostImage(reader.result);
          
          // addpost['image']=postimage
        };
      } else {
        setPostImage("");
      }
    };


    async function submitprofileForm(e){
      e.preventDefault();
      setIsloading(true);
      console.log(postimage)
      const formData=new FormData();
      formData.append('image',postimage)
        let token= localStorage.getItem('tkn')
    let {data}=await axios.patch("http://localhost:3001/users/updateprofilepicture",formData,{headers:{token}})
    console.log(data)
     if(data.message==="success"){
      console.log(data)
      // localStorage.removeItem('userData');
      // localStorage.setItem('userData',JSON.stringify(data.user))
      handleClose()
      getPosts()
      setIsloading(false);
     }else {
      setError(data.msg);
      setIsloading(false);
     }
      }


  



       useEffect(() => {
        showFriendStatus()
        getPosts()
        Status()
        
          }, []);
      const liked=true
  return <>
  {friendStatus?<div className='Profile'>
      <div className="images">
        <img src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className="cover" />
        <img src={user.image} alt="" className="profilePic translate-middle" />
        {userData.id === userId ? <div className='updateprofilePic'>
        
        <i className="fa-solid fa-camera fa-2x" onClick={handleShow}></i>
        <Modal className='Modal  mt-5' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >Update profile Picture</Modal.Title>
        </Modal.Header>
       
        <Modal.Body className='d-flex justify-content-center w-100'>
         
        
            <form onSubmit={submitprofileForm} className='d-flex flex-column justify-content-center'>
            
             {error.length>0 ? <div className="alert alert-danger">{error}</div> : "" }
             {errList.length>0 ? errList.map((err,idx)=>
             <div key={idx} className='alert alert-danger'> {err.message}</div>) :''}

             <input onChange={getuserData} type="file" placeholder='upload image' name="image" className='form-control w-100 mb-2 me-2' />

             <button  type='submit' className='btn btn-info rounded-pill '> {isloading === true?
     <i  className='fas fa-spin fa-spinner'></i>:"Update"}</button>
            </form>

            <div className="imagePerview">{postimage.name ? (
         <>
           <img src={postimage} alt="error!" />
         </>
       ) : (
         <p>Product image upload preview will appear here!</p>
       )}
           </div>

         
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
      </div>:""}

       
      </div>
   

      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="https://www.facebook.com/mo.ramadan01/" target="_blank">
            <i className='fa-brands fa-facebook fa-2x me-2 '></i>
            </a>
            <a href="https://www.linkedin.com/in/mostafa-ramadan-2539691ab/" target="_blank">
            <i className='fa-brands fa-linkedin fa-2x me-2 ' ></i>
            </a>
            <a href="https://www.instagram.com/mo.ramadan96/" target="_blank">
            <i className='fa-brands fa-instagram fa-2x me-2' ></i> 
            </a>
            <a href="http://wa.me/+201032273794" target="_blank">
            <i className="fa-brands fa-whatsapp fa-2x me-2"></i>

            </a>
            {/* <a href="https://www.instagram.com/mo.ramadan96/" target="_blank">
            <i className='fa-brands fa-github fa-2x me-2' ></i> 
            </a> */}
            
          </div>
          <div className="center">
            <span>{user.name}</span>
            <div className="info">
              <div className='item'><i className="fa-solid fa-location-dot"></i> Egy</div>
            <div className='item'><i className="fa-solid fa-globe"></i> Mostafa.com</div>
            
            </div>
            {userData.id === userId ? "":<div className='request'>
              {friendStatus.friend?<button className='btn btn-success'><i className="fa-solid fa-user-check me-2"></i>Freinds</button>:
            //  friendStatus?<button className='btn btn-primary'><i className="fa-solid fa-user-minus me-2"></i>confirm</button>:
              friendStatus.requestStatus? friendStatus.userdata2.requests.includes(friendStatus.user._id)?<button className='btn btn-primary'><i className="fa-solid fa-user-minus me-2"></i>confirm</button>:
              <button className='btn btn-primary'><i className="fa-solid fa-user-minus me-2"></i>Requested</button>
              : <button className='btn btn-primary' onClick={friendRequest}><i className="fa-solid fa-user-plus me-2"></i>Add Freind</button>}
             
              {followStatus?<button onClick={follow} className='btn btn-secondary'><i className="fa-solid fa-users-rectangle me-2"></i>Following</button>
              :<button onClick={follow} className='btn btn-info'>follow</button>}
              
            </div>  }
            {/* <ul className="navbar-nav ms-lg-auto   mb-2 mb-lg-0">
            <li class="nav-item dropdown btn btn-Light">
          <a class="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Following
          </a>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item" to='settings'>unfollow</Link></li>
          
          </ul>
        </li> 
            </ul> */}
            
           
            
            

          </div>
          <div className="right">
            <a href="mailto:mo.ramadan996@gmail.com" target="_blank">
            <i className="fa-regular fa-envelope fa-2x"></i>
            </a>
            {userData.id === userId?<i className="fa-solid fa-ellipsis-vertical fa-2x"></i>:""}
            
          </div>
        </div>
        

      </div>
      {/* <Posts/> */}
      {posts.length>0 ?  posts.map((post,idx)=>(
    <div key={idx} className='Post'>
   <div className='container'>
     <div className="user">
       <div className="userInfo">
       <Link to={`/profile/${post.createdBy._id}`} style={{textDecoration:"none",color:"inherit"}}>
       <img src={post.createdBy.image} alt="" />
         </Link> 
           
          <div className="details">
         <Link to={`/profile/${post.createdBy._id}`} style={{textDecoration:"none",color:"inherit"}}>
         <span className='name'>{post.createdBy.name}</span>
         </Link>
         <span className='date'>1 min ago </span>
         </div>
         
       </div>
       {/* edit post */}
       <div >
        {userData.id == post.createdBy._id ?<i className="fa-solid fa-ellipsis edit" onClick={()=>setEditShow(!editShow)}></i>:''}
        {/* <i className="fa-solid fa-ellipsis edit" onClick={()=>setEditShow(!editShow)}></i> */}
         {editShow && <div className='editPost '>
           <span ><i className='fa-regular fa-bookmark me-2'> </i> save Post</span>
           <span  onClick={updatePost}><i className='fa-solid fa-edit text-success me-2'> </i> edit Post</span>
           <span><i className='fa-solid fa-trash text-danger me-2'> </i> delete Post</span>
   
          </div>}
       </div>
       
     </div>
     <div className="contnet">
      <p>{post.content}</p>
      <img src={post.image} alt="" />
     </div>
     <div className="reactions">
     <div className="item">
        {!liked?<i className="fa-regular fa-heart me-2"></i>:
        <i className="fa-solid fa-heart text-danger me-2"></i>}
       {post.count}
      </div>
     <div className='comment-share'>
       <div className="item" onClick={()=>showComments(post._id)}>
         {post.comments.length} Comments
       </div>
       <div className="item">
       6 Share
       </div>
     </div>
     </div>
    
     <div className="info">
      <div className="item">
        {!liked?<i className="fa-regular fa-heart me-2"></i>:
        <i className="fa-solid fa-heart text-danger me-2"></i>}
        Like
      </div>
      <div className="item" onClick={()=>showComments(post._id)}>
        <i className="fa-regular fa-comment me-2"></i>
        Comments
      </div>
      <div className="item">
      <i className="fa-solid fa-share me-2"></i>
      Share
      </div>
     </div>
     {commentShow && <Comments id={id} getPosts={getPosts}/>}
   </div>

   
   {/* {updatePost && <div className="updatePost">
    <div className="post">
      <div className="add">
        <div className='text'>
          <h2>Create Post</h2>
          <i className="fa-regular fa-circle-xmark " onClick={()=>{setUpdatePost(!updatePost)}} ></i>
        </div>
        
        <div className="postInfo">
        <Link to={`/profile/1`} style={{textDecoration:"none",color:"inherit"}}>
         <img src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
           </Link>
             <form>
              <textarea type="text" placeholder="What's on your mind?" className='form-control' />
             </form>
           
        </div>
        <div className="events">
          <span><i className="fa-solid fa-video text-danger  fa-2x me-1"></i> Life video</span>
          <span ><i className="fa-solid fa-image text-bg-success fa-2x me-1"> </i> Photo/video</span>
          <span><i className="fa-solid fa-face-smile text-warning fa-2x me-1"></i>Feeling/activity</span>

        </div>
        <button className='btn btn-info rounded-pill w-100'>Post</button>
      </div>
    </div>
  </div> } */}
  {update && <UpdatePost/>}
   
   {/* <div className="updatePost">
    
    
       <Modal className='Modal  mt-5' >
         <Modal.Header closeButton>
           <Modal.Title >Update Post</Modal.Title>show={show} onHide={handleClose}
         </Modal.Header>
        
         <Modal.Body className='ModalBody'>
         
           <Form>
             
             <Form.Group
               className="mb-3"
               controlId="exampleForm.ControlTextarea1"
             >
               
               <Form.Control as="textarea" rows={3}
                placeholder="What's on your mind?" 
               />
             </Form.Group>
           </Form>
           <div className="events d-flex justify-content-around align-items-center">
            <span className='d-flex align-items-center'><i className="fa-solid fa-video text-danger  fa-2x me-2"></i> Life video</span>
            <span className='d-flex align-items-center'><i className="fa-solid fa-image text-bg-success fa-2x me-2"> </i> Photo/video</span>
            <span className='d-flex align-items-center'><i className="fa-solid fa-face-smile text-warning fa-2x me-2"></i>Feeling/activity</span>
    
          </div>
         </Modal.Body>
        
         <Modal.Footer className='d-flex justify-content-center'>
           <Button variant="secondary" onClick={handleClose}>
             Close
           </Button>
           <Button variant="success" onClick={handleClose}>
             Update
           </Button>
         </Modal.Footer>
       </Modal>
    
   </div > */}
  </div>
  
)):<div className='noPostsFound'>No posts available</div>} 
      
    </div>:<div className='noPostsFound'><i className='fa-solid fa-spin fa-spinner fa-2x'></i></div>}
    
    </>
}


