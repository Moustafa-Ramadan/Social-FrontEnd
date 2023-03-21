import React, { useContext } from 'react'
import "./UserCommunity.scss";
import { Link, Outlet } from 'react-router-dom';
// import axios from 'axios';
import { userCommunityContext } from './../../Context/UserCommunitycontext';


export default function UserCommunity() {
 
  const {errList,getuserCommunityData}=useContext(userCommunityContext)
  //2=>get all following
//   async function getAllFollowing(e){
 

//     let token= localStorage.getItem('tkn')
// let {data}=await axios.get("http://localhost:3001/users/allFollowing",{headers:{token}})
// console.log(data);
//  if(data.message==="success"){
//   setFollowing(data.user.following)
//  }else {
//   seterrList(data.msg);

//  }
//  }


  return <>
    <div className='FollowersAndFollowing'>
         
 <div className="container">
  <div className="settingList">

    <div className="optionList ">
    {errList.length>0?<div className='alert alert-danger'>{errList}</div>:""}
<ul className=' navbar-nav  shadow-lg '>
  <Link className='settings' onClick={getuserCommunityData}  to='Followers'> 
  <li><i className="fa-solid fa-users text-success  mb-2"></i>Followers</li>
  </Link>


     <Link className='settings' onClick={getuserCommunityData}   to='Following'>
     <li><i className="fa-solid fa-user-group text-info mb-2"></i>Following</li>
     </Link>

     <Link className='settings' onClick={getuserCommunityData}   to='Friends'>
     <li><i className="fa-solid fa-user-group text-info mb-2"></i>Friends</li>
     </Link>
 
</ul>
 </div>
 
 
 
  </div>
  
  <div className="setList ">
 <Outlet />
 </div>
  
  
  </div> 
    </div>
    </>
}






 
  
  
