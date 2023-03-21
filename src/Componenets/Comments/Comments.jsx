import React from 'react'
import "./Comments.scss"
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Joi from 'joi';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';


export default function Comments(props) {
    let navigation=useNavigate()
    const [errList, setErrList] = useState('')
const [error, setError] = useState('')
    const [comments, setComments] = useState([])
     const [userpost, setuserpost] = useState({
  
        post_id:props.id,
        });
        const [isloading, setIsloading] = useState(false)
       const [addcomment, setAddcomment] = useState({
    post_id:props.id,
    content:""
             });
             const [id, setid] = useState("")
             const [updatecomment, setUpdateComment] = useState({
                content:"", 
                id:"",
                 });
                 const [deletecomment, setDeleteComment] = useState({
                  id:"",
                   });

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


             //get All Comments
    async function getComments(){
      let token= localStorage.getItem('tkn')
      const{data}=await axios.post(`http://localhost:3001/comments/postComments`,userpost,{headers:{token}})
      setComments(data.comments)
      
    }
    //get All Comments
    useEffect(() => {
        getComments()
        }, []);


        


//1=> Add Comment
  const getCommentData=(e)=>{
    const MyComment={...addcomment};
    MyComment[e.target.name]=e.target.value;
    

    setAddcomment(MyComment)
    }
    
  
    
  
  //validation form
  
    function validationCommentForm(){

    let schema=Joi.object({
        post_id:Joi.string().min(24).max(24),
        content:Joi.string().min(3).max(200).required(), 
        id:Joi.string().min(24).max(24),
      })
   

    return schema.validate(addcomment, {abortEarly:false})

  }

   //1=> Add Comment
   async function submitCommentForm(e){
    e.preventDefault();
    setIsloading(true)
    let {error}= validationCommentForm();
    if(error){
      setErrList(error.details)
      setIsloading(false)
      
    }
    else
    {
    let token= localStorage.getItem('tkn')
  let {data}=await axios.post("http://localhost:3001/comments/addcomment",addcomment,{headers:{token}})
  
   if(data.message==="success"){
    getComments()
    props.getPosts()
    // navigation('/')
    setIsloading(false);
   }else {
    setError(data.msg);
    setIsloading(false);
   }
    }}
 
    
    //2=>updateComment
  

       const update=(id)=>{
        setid(id);
    console.log(id)
        handleShow();
       }
    //Add updated Comment
  const getComment=(e)=>{
    // const MyComment={...updatecomment};
    updatecomment['content']=e.target.value;
    updatecomment['id']=id;

    // MyComment['id']=id;
    setUpdateComment(updatecomment)
    setErrList('');
 
    }
    

   async function submitUpdateCommentForm(e){
    e.preventDefault();
    setIsloading(true)
   
    let {error}= validationCommentForm();
    if(error){
      setErrList(error.details)
      setIsloading(false)
     
    }
    else
    {
    let token= localStorage.getItem('tkn')
  let {data}=await axios.patch("http://localhost:3001/comments/updatecomment",updatecomment,{headers:{token}})
  console.log(data);
   if(data.message==="success"){
    handleClose()
    getComments()
    props.getPosts()
    // navigation('/')
    setIsloading(false);
   }else {
    setError(data.msg);
    setIsloading(false);
   }
    }}

    // 3=> delete Comment 

    async function deleteComm(idComment){
      deletecomment['id']=idComment;
      
      let token= localStorage.getItem('tkn')
      
      let {data}=await axios.post("http://localhost:3001/comments/deletecomment",deletecomment,{headers:{token}})
     
      if(data.message==="success"){
        getComments()
        props.getPosts()
       }else {
        setError(data.msg);
       }
      }

      const delcomment=(idComment)=>{
        deleteComm(idComment)
      }

      let userData=  JSON.parse(localStorage.getItem('userData'))
      

  return <>
    <div className='Comments'>
    
      {error.length>0 ? <div className="alert alert-danger">{error}</div> : "" }
      {errList.length>0 ? errList.map((err,idx)=>
    <div key={idx} className='alert alert-danger'> {err.message}</div>) :''}
        <div className="writeComment">
        <img src={userData.image} alt="" />
<form onSubmit={submitCommentForm}>
    <input onChange={getCommentData} type="text" className='form-control' placeholder='write a commnet' name='content' />
    <button  type='submit' className='btn btn-info rounded-pill '> {isloading === true?
      <div className='fas fa-spin fa-spinner'></div>:<i className="fa-solid fa-paper-plane text-success"></i>}</button>

    {/* <button><i className="fa-solid fa-paper-plane text-success"></i></button> */}
</form>
        </div>
       
         {comments.map((comment,idx)=>(
            <div key={idx} className="comment">
                <Link to={`/profile/${comment.createdBy._id}`} style={{textDecoration:"none",color:"inherit"}}>
                <img src={comment.createdBy.image} alt="" />
               </Link>
                
                <div className='info'>
                <Link to={`/profile/${comment.createdBy._id}`} style={{textDecoration:"none",color:"inherit"}}>
                    <span className='name'>{comment.createdBy.name} <span className='date ms-2'>{ moment(comment.createdAt).fromNow()}</span></span>
               </Link>
                  <p>{comment.content}</p>
                </div>
               {userData.id == comment.createdBy._id ? <span className='UpdateComment'> <i onClick={()=>update(comment._id)} className='fa-solid fa-edit text-info text-center ms-4 me-2'></i>
          <i onClick={()=>delcomment(comment._id)}  className='fa-solid fa-trash text-danger text-center me-2 '></i></span>:'' }
          {/* //       <span className='UpdateComment'> <i onClick={()=>update(comment._id)} className='fa-solid fa-edit text-info text-center ms-4 me-2'></i>
          // <i onClick={()=>deleteComm(comment._id)}  className='fa-solid fa-trash text-danger text-center me-2 '></i></span>
          //       <span className='date'>{comment.createdAt}</span> */}
    
            </div>
            
        ))} 

         

    
    
          <Modal className='mt-5 modal' show={show} onHide={handleClose}>
          {error.length>0 ? <div className="alert alert-danger">{error}</div> : "" }
      {errList.length>0 ? errList.map((err,idx)=>
    <div key={idx} className='alert alert-danger'> {err.message}</div>) :''}
            <Modal.Header  closeButton>
              <Modal.Title>Update Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modalBody'> 
                <form onSubmit={submitUpdateCommentForm} className='d-flex justify-content-center'>
                <input onChange={getComment} type="text" className='form-control'
                 placeholder='write a commnet' name='content' />
                 
                 <Button  type='submit' className='btn btn-info bg-transparent border-0 rounded-pill '> {isloading === true?
      <div className='fas fa-spin fa-spinner'></div>:<i className="fa-solid fa-paper-plane text-success"></i>}</Button>
           </form>
           </Modal.Body>
           <Modal.Footer className='d-flex justify-content-center'>
           <Button variant="secondary" onClick={handleClose}>
             Close
           </Button>
           <Button variant="success">
             Update
           </Button>
         </Modal.Footer>
          </Modal>

    
       
    
   
    </div>
    </>
}
