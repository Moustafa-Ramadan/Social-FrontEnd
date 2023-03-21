import React from 'react'
import "./Strories.scss"
import img1 from '../../images/IMG_6387.JPG';



export default function Home() {
  let userData=  JSON.parse(localStorage.getItem('userData'))
  //TEMPORARY
  const stories = [
    {
      id: 1,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 2,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 3,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 4,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
  ];
  return <>
  <div className='Stories'>
    <div className="story ">
      <img src={userData.image} alt="" />
      <span>{userData.name}</span>
      <button>+</button>
    </div>
   {stories.map(story => (
<div key={story.id} className="story  ">
 <img src={story.img} />
  <span>{story.name}</span>
</div>
   ))}
   
  </div>

  
  
  
  </>
    
  
}
