import React,{ useState, useEffect, useContext }  from 'react';
import img1 from '../../images/profile.social-media-user.jpg';
import "./RightBar.scss";
import axios from 'axios';
import { userCommunityContext } from './../../Context/UserCommunitycontext';
import { Link } from 'react-router-dom';



export default function RightBar() {
  const {user,getuserCommunityData}=useContext(userCommunityContext)
  const [request, setRequest] = useState([])
  const [online, setOnline] = useState([])

  const [id, setId] = useState({
    userId:"",
  })


    async function getfriendRequests(){
    let token= localStorage.getItem('tkn')
    const{data}=await axios.get(`http://localhost:3001/users/FriendsRequests`,{headers:{token}})
    setRequest(data)
    
    console.log({"data":data})
    
  }
  //2=>confirm friend requests
  async function confirmRequests(userid){
    let token= localStorage.getItem('tkn')
    id['userId']=userid
    const{data}=await axios.post(`http://localhost:3001/users/confirmFriendRequest`,id,{headers:{token}})
    console.log(id)
    console.log(data)
    getfriendRequests()
    onlineFriends(userid)
  }
 async function submit(userid){
 await confirmRequests(userid)
    getuserCommunityData()
  }

  //3=>dismiss friend requests
 //2=>confirm friend requests
 async function dismissRequests(userid){
  let token= localStorage.getItem('tkn')
  id['userId']=userid
  const{data}=await axios.post(`http://localhost:3001/users/dismissFriendRequest`,id,{headers:{token}})
  console.log(id)
  console.log(data)
}
async function dismiss(userid){
await dismissRequests(userid)
  getuserCommunityData()
}
async function onlineFriends(userid){
  let token= localStorage.getItem('tkn')
  const{data}=await axios.get(`http://localhost:3001/users/onlineFriends`,{headers:{token}})
  setOnline(data)
  console.log({data})
}

  console.log({req:request})
  //get All Comments
  useEffect(() => {
    getfriendRequests()
    onlineFriends()
      }, []);

  return <>
    <div className='RightBar'>
      <div className="container">  
        <div className="item shadow">
          <span>Friend requests</span>
          {/* {user?  user.requests.length>0? user.requests.map((friend,idx)=>   <div key={idx}  className="user">
          <div className="userInfo">
          <Link to={`/profile/${friend._id}`} style={{textDecoration:"none",color:"inherit"}}>
       <img src={friend.image} alt="" />
         </Link> 
         <Link to={`/profile/${friend._id}`} style={{textDecoration:"none",color:"inherit"}}>
         <span className='name'>{friend.name}</span>
         </Link>
          
          </div>

          <div className="buttons">
            <button onClick={()=>{submit(friend._id)}} className='btn btn-info me-2 '>confirm</button>
            <button onClick={()=>{dismiss(friend._id)}} className='btn btn-danger'>delete</button>

          </div>
          
          </div>):<div>No Friend Requests yet</div>:""} */}
         
          {request.friendreq?  request.friendreq.requests.length>0? request.friendreq.requests.map((friend,idx)=>   <div key={idx}  className="user">
          <div className="userInfo">
          <Link to={`/profile/${friend._id}`} style={{textDecoration:"none",color:"inherit"}}>
       <img src={friend.image} alt="" />
         </Link> 
         <Link to={`/profile/${friend._id}`} style={{textDecoration:"none",color:"inherit"}}>
         <span className='name'>{friend.name}</span>
         </Link>
          
          </div>

          <div className="buttons">
            <button onClick={()=>{submit(friend._id)}} className='btn btn-info me-2 '>confirm</button>
            <button onClick={()=>{dismiss(friend._id)}} className='btn btn-danger'>delete</button>

          </div>
          
          </div>):<div className='noRequests'>No Friend Requests yet</div>:""} 

        

      
          
        </div>
        {/* <div className="item shadow">
          <span>Friend requests</span>
          {request.friendRequests.map((friend,idx)=>   <div key={idx}  className="user">
          <div className="userInfo">
          <img src={friend.image} alt=""  />       
           <span>{friend.name}</span>
          </div>

          <div className="buttons">
            <button className='btn btn-info me-2 '>confirm</button>
            <button className='btn btn-danger'>dismiss</button>

          </div>
          
          </div>)}
       
      
          
        </div> */}

        <div className="item shadow">
          <span>Latest Activities</span>
          <div className="user">
          <div className="userInfo">
          <img src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600" alt=""  /> 
          <p className='mb-0'>
          <span>Mostafa</span> changed their cover picture
          </p>      
  
          </div>
          <div className='d-flex align-items-center'>
            <span>1 min ago</span>
          </div>
          
          </div>
          <div className="user">
          <div className="userInfo">
          <img src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600" alt=""  /> 
          <p className='mb-0'>
          <span>Mostafa</span> liked a post
          </p>      
  
          </div>
          <div className='d-flex align-items-center'>
            <span>1 min ago</span>
          </div>
          
          </div>
          <div className="user">
          <div className="userInfo">
          <img src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600" alt=""  /> 
          <p className='mb-0'>
          <span>Mostafa</span> liked a comment
          </p>      
  
          </div>
          <div className='d-flex align-items-center'>
            <span>1 min ago</span>
          </div>
          
          </div>
          <div className="user">
          <div className="userInfo">
          <img src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600" alt=""  /> 
          <p className='mb-0'>
          <span>Mostafa</span> added a post
          </p>      
  
          </div>
          <div className='d-flex align-items-center'>
            <span>1 min ago</span>
          </div>
          
          </div>
          
        </div>
        <div className="item shadow">
          <span>Online Freinds</span>
          {online.onlinefriends? online.onlinefriends.map((friend,idx)=><div key={idx} className="user">
          <div className="userInfo">
          <Link to={`/profile/${friend._id}`} style={{textDecoration:"none",color:"inherit"}}>
       <img src={friend.image} alt="" />
         </Link> 
         <Link to={`/profile/${friend._id}`} style={{textDecoration:"none",color:"inherit"}}>
         <span className='name'>{friend.name}</span>
         </Link>
           <div className="online"></div> 
          </div>
        
          </div>):""
          }
         
          
         
        </div>
      </div>
    </div>
    </>
  
}
