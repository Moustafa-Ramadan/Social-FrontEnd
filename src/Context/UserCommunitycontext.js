import React,{ createContext, useState } from "react";
import { useEffect } from 'react';
import axios from 'axios';
 
export  let userCommunityContext=createContext(0)


export default function CommunityContextProvider (props){

   
    const [user, setUser] = useState([]);

    const [errList, seterrList] = useState("");
    
    
  
    
   //2=>get all followers
    
    async function getuserCommunityData(){
   
  
       let token= localStorage.getItem('tkn')
   let {data}=await axios.get("http://localhost:3001/users/allFollowers",{headers:{token}})
   console.log(data);
    if(data.message==="success"){
      setUser(data.user)
    }else {
  
     seterrList(data.msg);
  
    }
    }
    

    
    
   
      useEffect(() => {
        
        getuserCommunityData()
        
        }, [] )
return <userCommunityContext.Provider value={{user,errList,getuserCommunityData}}>

{props.children}

</userCommunityContext.Provider>

}