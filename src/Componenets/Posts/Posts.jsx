import React from 'react'
import "./Posts.scss"
import Post from "../Post/Post"

export default function Posts() {

  

  return <>
  <div className='Posts'>
  <Post/>
    {/* {posts.map(post=>(
      <Post post={post} key={post.id}/>
    ))} */}
  </div>
  </>
}
