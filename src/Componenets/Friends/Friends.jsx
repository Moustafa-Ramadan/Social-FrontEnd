import React, { useContext, useEffect, useState} from 'react'
import "./Friends.scss";
import { Link } from 'react-router-dom';

import { userCommunityContext } from '../../Context/UserCommunitycontext';
import axios from 'axios';
export default function Friends(props) {




  const {user}=useContext(userCommunityContext)
 
 
  
  return <>
 

  <div className="Friends">
  <div className="container">
  
<div className='FriendsList row'>

 
<span className='FriendsCount'>Friends: {user.friends.length}</span>
{user.friends.length>0?  user.friends.map((friend,idx)=> <div key={idx} className="userInfo col-md-4">
     
     <div className="userInfo">
<Link to={`/profile/${friend._id}`} style={{textDecoration:"none",color:"inherit"}}>
<img src={friend.image} alt="" />
  </Link> 
    
  <Link to={`/profile/${friend._id}`} style={{textDecoration:"none",color:"inherit"}}>
  <span className='name'>{friend.name}</span>
  </Link>
  
  
</div>
 
  </div>)  :<div>No friends yet</div>}
    
        
       
       </div>

    
  </div>
  </div>
  


 
  
  
  </>
}