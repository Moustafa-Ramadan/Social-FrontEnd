import React from 'react';
import "./Settings.scss";
import { Link, Outlet } from 'react-router-dom';

export default function Settings() {
  return <>
    <div className='Settings'>
         
 <div className="container">
  <div className="settingList">

    <div className="optionList ">
<ul className=' navbar-nav  shadow-lg '>
  <Link className='settings' to='updateaccount'> 
  <li><i className='fa-solid fa-edit text-success '></i>Update Account</li>
  </Link>


     <Link className='settings' to='changepassword'>
     <li><i className='fa-solid fa-edit text-success'></i>Change Password</li>
     </Link>
     <Link className='settings' to='deleteaccount'>
     <li><i className='fa-solid fa-trash text-danger'></i>Delete Account</li>
     </Link>
 
</ul>
 </div>
 <div className="setList ">
 <Outlet/>
 </div>
 
 
  </div>
  
  
  </div> 
    </div>
    </>
}






 
  
  
