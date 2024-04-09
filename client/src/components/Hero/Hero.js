import React from 'react'
import "./Hero.css"
import { NavLink } from 'react-router-dom'

const Hero = () => {
  return (
    <div>
        <div className='hero '> 
            <div className='hero-text'>
                <h1>Camera Rental</h1>
                <p>Capture memories that will never fade away. We are here to provide you a premium quality camera gears you need.
                </p>
                <button className='btn'>
                  <NavLink to = "/Product">
                    See More
                  </NavLink>
                </button>
            </div>
        </div>

    </div>
  )
}

export default Hero
