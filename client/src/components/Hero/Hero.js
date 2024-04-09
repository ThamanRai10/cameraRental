import React from 'react'
import "./Hero.css"
import dark_arrow from "../../assets/white-arrow.png"

const Hero = () => {
  return (
    <div>
        <div className='hero '> 
            <div className='hero-text'>
                <h1>Searching for Camera Rental</h1>
                <p>This website provides the good quality of camera, lenses and equipments 
                    for the 
                </p>
                <button className='btn'>Explore more<img src={dark_arrow} alt="" /></button>
            </div>
        </div>

    </div>
  )
}

export default Hero
