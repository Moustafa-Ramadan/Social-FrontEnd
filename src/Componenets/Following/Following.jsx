import React, { useContext} from 'react'
import "./Following.scss";
import { Link } from 'react-router-dom';

import { userCommunityContext } from './../../Context/UserCommunitycontext';
export default function Following(props) {




  const {user}=useContext(userCommunityContext)
 
  
   
  
  
  return <>
 

  <div className="Following">
  <div className="container">
  
<div className='followingList row'>

 
<span className='followingCount'>Following: {user.following.length}</span>
{user.following.length>0?  user.following.map((following,idx)=> <div key={idx} className="userInfo col-md-4">
     
     <div className="userInfo">
<Link to={`/profile/${following._id}`} style={{textDecoration:"none",color:"inherit"}}>
<img src={following.image} alt="" />
  </Link> 
    
  <Link to={`/profile/${following._id}`} style={{textDecoration:"none",color:"inherit"}}>
  <span className='name'>{following.name}</span>
  </Link>
  
  
</div>
 
  </div>)  :<div>No following available</div>}
    
        
       
       </div>
  </div>
  </div>
  


 
  
  
  </>
}