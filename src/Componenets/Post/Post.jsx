import React, { useEffect } from 'react'
import "./Post.scss"
// import img1 from '../../images/IMG_6387.JPG';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Comments from './../Comments/Comments';
import Createpost from '../Createpost/Createpost'
import UpdatePost from '../UpdatePost/UpdatePost'
import  Axios  from 'axios';
import moment from 'moment'
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';



export default function Posts(props) {
  let navigation=useNavigate()

const [error, setError] = useState('')
  const [commentShow, setCommentShow] = useState(false)
  const [editShow, setEditShow] = useState(false)
  const [update, setUpdate] = useState(false)
  const [posts, setPosts] = useState([])
  const [id, setid] = useState("")
  const [postId, setPostId] = useState({
    post_id:"",
  })
  const [like, setLike] = useState(false)

  

  let userData=  JSON.parse(localStorage.getItem('userData'))
  

  async function getPosts(){
    let token= localStorage.getItem('tkn')
    const{data}=await Axios.get(`http://localhost:3001/posts/allposts`,{headers:{token}})
    setPosts(data.posts)
   
  }

  // async function getlikes(){
  //   let token= localStorage.getItem('tkn')
  //   const{data}=await Axios.post(`http://localhost:3001/posts/getlikes`,{headers:{token}})
  //   setPosts(data.posts)
   
  // }
  
  useEffect(() => {
    getPosts()
      }, []);
  
  
  // const [updatePost, setUpdatePost] = useState(false)
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);


 const showComments=(id)=>{
  setCommentShow(!commentShow);
  setid(id)

 };

 const updatePost=()=>{
  
  setEditShow(!editShow)
  setUpdate(!update)
 }
  

const liked=true

//3=>delete post
async function delpost(Id){
  postId["post_id"]=Id;
  let token= localStorage.getItem('tkn')
  let {data}=await Axios.post("http://localhost:3001/posts/deletepost",postId,{headers:{token}})
  console.log(data);
  if(data.message==="success"){
    getPosts()
   }else {
    setError(data.message);
   }
  }

  //4=> edit post
   function updatepo(Id){
    postId["post_id"]=Id;
    updatePost()
    console.log(postId);
    }
  
//5=>like or dislike post
async function likedPost(Id){
  postId["post_id"]=Id;
  console.log(postId)
  let token= localStorage.getItem('tkn')
  let {data}=await Axios.patch("http://localhost:3001/posts/upAndDown",postId,{headers:{token}})
  
  
  if(data.message==="success"){
    setLike(data.like)
    console.log(like);
    getPosts()
   }else {
    setError(data.message);
   }
 }


  

  return <>



  <Createpost getPosts={getPosts}/>
  {error.length>0 ? <div className="alert alert-danger">{error}</div> : "" }
 {posts.length>0 ?  posts.map((post,idx)=>(
    <div key={idx} className='Post '>
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
         <span className='date'>{moment(post.createdAt).fromNow()}</span>
         </div>
         
       </div>
       {/* edit post */}
       <div >
        {userData.id == post.createdBy._id ?<i className="fa-solid fa-ellipsis edit" onClick={()=>setEditShow(!editShow)}></i>:''}
        {/* <i className="fa-solid fa-ellipsis edit" onClick={()=>setEditShow(!editShow)}></i> */}
         {editShow && <div className='editPost '>
           <span ><i className='fa-regular fa-bookmark me-2'> </i> save Post</span>
           <span  onClick={()=>updatepo(post._id)}><i className='fa-solid fa-edit text-success me-2'> </i> edit Post</span>
           <span><i onClick={()=>delpost(post._id)} className='fa-solid fa-trash text-danger me-2'> </i> delete Post</span>
   
          </div>}
       </div>
       
     </div>
     <div className="contnet">
      <p>{post.content}</p>
      <img src={post.image} alt="" />
     </div>
     <div className="reactions">
     <div className="item">
        {post.count < 1 ?<i className="fa-regular fa-heart me-2"></i>:
        <i className="fa-solid fa-heart text-danger me-2"></i>}
       {post.count}
      </div>
     <div className='comment-share'>
       <div className="item" onClick={()=>showComments(post._id)}>
         {post.comments.length} Comments
       </div>
       <div className="item">
       0 Share
       </div>
     </div>
     </div>
    
     <div className="info">
      <div  className="item">
        {like ===false ?<i onClick={()=>likedPost(post._id)} className="fa-regular fa-heart me-2"></i>:
        <i onClick={()=>likedPost(post._id)} className="fa-solid fa-heart text-danger me-2"></i>}
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
  {update && <UpdatePost getPosts={getPosts} postId={postId} update={update}/>}
   
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
  
)):
 <div className='noPostsFound'>No posts available</div>} 
 


 
  
  </>
}
