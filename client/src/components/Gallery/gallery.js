import React from 'react'
import './gallery.css'
import gallery_1 from '../../assets/gallery1.png'
import gallery_2 from '../../assets/gallery2.png'
import gallery_3 from '../../assets/gallery3.png'
import gallery_4 from '../../assets/Camera.jpg'

const gallery = () => {
  return (
    <div className='main'>
        <div className="gallery"></div>
        <img src={gallery_1} alt="" />
        <img src={gallery_2} alt="" />
        <img src={gallery_3} alt="" />
        <img src={gallery_4} alt="" />
      
    </div>
  )
}

export default gallery
