import React, { useContext } from 'react'
import "./Navbar.scss"
import img1 from '../../images/profile.social-media-user.jpg';
import { Link } from 'react-router-dom';
import { DarkModeContext } from './../../Context/DarkModeContext';
import { useState } from 'react';
import  Axios  from 'axios';

export default function Navbar(props) {
const{darkMode,toggle}=useContext(DarkModeContext)

const [navbarshow, setNavbarShow] = useState(true)
let userData=  JSON.parse(localStorage.getItem('userData'))

const [searchshow, setSearchShow] = useState(false)
const [search, setSearch] = useState({
  keyword:""
})

const [searchResult, setSearchResult] = useState("")


function BlurSearch(e){
  
  setInterval(() => {
    setSearchShow(false)
    setSearchResult("")
    
  }, 200);
 
  e.target.value=""
}

const getkeyWord=async(e)=>{
search['keyword']=(e.target.value)
console.log(e.target.value)
const{data}=await Axios.post(`http://localhost:3001/users/search`,search)
console.log(data)
if(data.message==="success"){
  setSearchResult(data)
  console.log(searchResult.users)
}
  }

  return <>
  <nav className="navbar   navbar-expand-lg ">
  <div className="container-fluid">
    <Link className="navbar-brand"  to="/">Social</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" onClick={()=>setNavbarShow(!navbarshow)} data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    {navbarshow &&  <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <ul className="navbar-nav apps  mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/" ><i className="fa-solid fa-house " ></i></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" >
            {!darkMode?<i onClick={toggle} className="fa-regular fa-moon"></i>: 
            <i onClick={toggle} className="fa-regular fa-sun"></i>}
            
           

            </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" ><i className="fa-solid fa-grip bg-transparent "></i></Link>
        </li>
       
       
      </ul>
      <form  role="search">
        <input className="form-control me-2" type="search" placeholder="Search" onFocus={()=>setSearchShow(!searchshow)} onBlur={BlurSearch} onChange={getkeyWord}  aria-label="Search"/>
        {searchshow &&   <div className="searchResults">
          {searchResult.users ? searchResult.users.map((user,idx)=><div key={idx} className="userInfo mb-2">
       <Link to={`/profile/${user._id}`} style={{textDecoration:"none",color:"inherit"}}>
       <img src={user.image} alt="" />
         </Link> 
        
           
          <div className="details">
         <Link to={`/profile/${user._id}`} style={{textDecoration:"none",color:"inherit"}}>
         <span className='name'>{user.name}</span>
         </Link>
         
         </div>
         
       </div>)  :<div className='text-center'>No recent searches</div>}
          
        
  </div>
}
      
      </form>
     
      <ul className="navbar-nav ms-lg-auto   mb-2 mb-lg-0">
        
        <li className="nav-item user ">
      <div className='user-notification'>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="UserCommunity" ><i className="fa-regular fa-user"></i></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" ><i className="fa-regular fa-envelope"></i></Link>
          </li>
          <li className="nav-item me-3">
            <Link className="nav-link active" aria-current="page" ><i className="fa-regular fa-bell"></i></Link>
          </li>
      </div>
<li className='image '>
  {/* <img src={userData.image} alt=""  />    */}
  <Link to={`/profile/${userData.id}`} >
       <img src={userData.image} alt="" />
         </Link> 
</li> 
<li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {userData.name}
          </a>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item" to='settings'>settings</Link></li>
            <li><hr class="dropdown-divider"/></li>
            <li onClick={props.logout}><span class="dropdown-item"  ><i className="fa-solid fa-right-from-bracket me-2"></i>LogOut</span></li>
          </ul>
        </li>      
</li>
       
      </ul>
    </div> }
   
  </div>
</nav>



    </>
    
}
