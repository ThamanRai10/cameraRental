import React from 'react'
import './about.css'
import img_1 from '../../assets/about.jpg'

const about = () => {
  return (
    <div className='about'>
        <div className='about-left'>
            <img src={img_1} alt="" className='about-img' />
        </div>
        <div className='about-right'>
            <h3>ABOUT CAMERA RENTAL</h3>
            <h2>Check out our details and work process</h2>
            <p>
              Camera Rental offers comprehensive rental services for cameras,
              completelight & grips rental, and full postproduction tools
              including color grading, videoediting, Visual effects, and audio
              debugging. Customers can rent their preferred brands of camera,
              lenses, lighting equipment’s, video and films, production
              equipment’s, and much more through our website, likewise
              professional photographers are also available for hiring. The
              suggested system is an entirely online based.{" "}
            </p>
            <p>
              It effectively and efficiently automates manual process well our
              main moto is to solve the gear and equipment-based problems. As
              every clients have specific requirements for every different
              projects so the photographers and videographers requires specific
              and a lot varieties of equipment i.e. professional camera and
              lenses, High quality light equipment and modifiers, well audio is
              another necessary part of every project or films. We have a huge
              varieties of audio tools likewise after every shoot or fields work
              another step of enhancements is postproduction so considering that
              in mind.
            </p>

        </div>
    </div>
  )
}

export default about
