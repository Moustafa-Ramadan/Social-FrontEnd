import React, { useContext } from 'react'
import "./Followers.scss";
import { Link} from 'react-router-dom';
import { userCommunityContext } from './../../Context/UserCommunitycontext';

export default function Followers(props) {
  


  const {user}=useContext(userCommunityContext)
  
 
  
  //  async function getAllFollowers(e){
  
 
  //     let token= localStorage.getItem('tkn')
  // let {data}=await axios.get("http://localhost:3001/users/allFollowers",{headers:{token}})
  // console.log(data);
  //  if(data.message==="success"){
  //   setFollowers(data.user.followers)
  // setIsLoading(false);
  //  }else {

  //   seterrList(data.msg);
  //   setIsLoading(false);
  //  }
  //  }
  
  
  return <>
 

 <div className="Followers">
  <div className="container">
  
<div className='FollowersList row'>
<div className='FollowersCount'>Followers: {user.followers.length}</div>
{user.followers.length>0?user.followers.map((follower,idx)=> <div key={idx} className="userInfo col-md-4">
 
 <div className="userInfo">  
<Link to={`/profile/${follower._id}`} style={{textDecoration:"none",color:"inherit"}}>
<img src={follower.image} alt="" />
</Link> 

<Link to={`/profile/${follower._id}`} style={{textDecoration:"none",color:"inherit"}}>
<span className='name'>{follower.name}</span>
</Link>


</div>

</div>):<div>No followers available</div>}
 
      
    
       </div>
  </div>
  </div>


 
  
  
  </>
}