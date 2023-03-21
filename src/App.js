// import React, { Children } from 'react'  
import { createBrowserRouter, Navigate, Outlet,RouterProvider } from 'react-router-dom';
import Login from './Componenets/Login/Login';
import Register from './Componenets/Register/Register';
import Navbar from './Componenets/Navbar/Navbar';
import LeftBar from './Componenets/LeftBar/LeftBar';
import RightBar from './Componenets/RightBar/RightBar';
import Home from './Componenets/Home/Home';
import Profile from './Componenets/Profile/Profile';
import "./Style.scss"
import { useContext, useEffect, useState } from 'react';
import { DarkModeContext } from './Context/DarkModeContext';
import jwtDecode from "jwt-decode";
// import { AuthenticationContext } from './Context/AuthContext ';
import Settings from './Componenets/Settings/Settings';
import ChangePassword from './Componenets/ChangePassword/ChangePassword';
import UpdateAccount from './Componenets/UpdateAccount/UpdateAccount';
import DeleteAccount from './Componenets/DeleteAccount/DeleteAccount';
import Following from './Componenets/Following/Following';
import Followers from './Componenets/Followers/Followers';
import Friends from './Componenets/Friends/Friends';
import UserCommunity from './Componenets/UserCommunity/UserCommunity';
import  Axios  from 'axios';

export default function App() {
  // const {currentUser} = useContext(AuthContext);

  const{darkMode}=useContext(DarkModeContext)
// const user=useContext(AuthenticationContext)

// const currentuser=()=>{
//   user.saveUserData()
// }

// const HandleLogout=()=>{
//   user.logOut()
// }

// const HandleProtectedRoute=()=>{
//   user.ProtectedRoute()
// }
const [userData, setUserData] = useState(null)

function saveUserData() {
  let encodedToken=localStorage.getItem('tkn')
 let decodedToken= jwtDecode(encodedToken)
 setUserData(decodedToken)
 localStorage.setItem('userData',JSON.stringify(decodedToken))
//  console.log(decodedToken)
}

function refreshUserData() {
  
  localStorage.removeItem('userData');

  let encodedToken=localStorage.getItem('token')
 let decodedToken= jwtDecode(encodedToken)
 setUserData(decodedToken)
 localStorage.setItem('userData',JSON.stringify(decodedToken))
//  console.log(decodedToken)
}

useEffect(() => {
  
  if(localStorage.getItem('tkn')){
    saveUserData()
    // console.log(userData)
      }
      

}, [])



async function logOut() {
  let token= await localStorage.getItem('tkn')
  const{data}=await Axios.get(`http://localhost:3001/users/Logout`,{headers:{token}})
  console.log(data)
  setUserData(null);
  localStorage.removeItem('tkn');
  localStorage.removeItem('userData');
<Navigate to='/login'/>

}

 function ProtectedRoute({ children }) {
   if(localStorage.getItem('tkn')===null){
     return <Navigate to='/login'/>
   }
   else
   {
     return children

   }
 }
  const Layout=()=>{
    return<>
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      
<Navbar logout={logOut}  userData={userData} saveUserData={saveUserData}/>
<div className='d-flex '>

<LeftBar userData={userData}/>
<div style={{flex:6}}>
  <Outlet/>
</div>
<RightBar/>
</div>
    </div>
    </>
   }
    // const protectedRoute=({ children }) => {
  //   if(!currentUser){
  //     return <Navigate to="/login"/>
  //   }
    
  //   return children
    
  // }
  const router=createBrowserRouter([
    { path:'/',
     element:<ProtectedRoute><Layout/></ProtectedRoute>,
     children:[
      {
        
        path:'/',
        element: <Home/> 
      },
      {
        path:'/profile/:id',
        element:<Profile refreshUserData={refreshUserData}/> 
      },
      {
        path:'/settings',
        element:<Settings/>,
      children:[
        {path:'changepassword',
        element:<ChangePassword  logout={logOut}/>,
      },
      {path:'updateaccount',
        element:<UpdateAccount logout={logOut}/>,
      },
      {path:'deleteaccount',
        element:<DeleteAccount logout={logOut}/>,
      }
        
      ]
      },
      {
        path:'/UserCommunity',
        element:<UserCommunity/>,
      children:[
        {path:'Following',
        element:<Following/>,
      },
      {path:'Followers',
        element:<Followers/>,
      },
      {path:'Friends',
        element:<Friends/>,
      }
        
      ]
      },
     ]
    },
    {
      path:'/login',
        element:<Login  saveUserData={saveUserData}/>
    },
    {
      path:'/signup',
        element:<Register/>
    },
    ])
 return <>
<div>
  <RouterProvider router={router}  />
</div>
  
</>
  
}


