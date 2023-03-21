import React from 'react'
import "./Home.scss"
// import Stories from "../Stories/Stories"
import  Stories  from '../Stories/Stories';
import Posts from './../Post/Post';




export default function Home() {
  return <>
  <div className='Home'>
<Stories/>
<Posts/>
  </div>
  
  
  </>
    
  
}
