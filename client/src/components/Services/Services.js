import React from 'react'
import "./Services.css"

import service_2 from '../../assets/h2.png'
import service_3 from '../../assets/h3.png'
import service_4 from '../../assets/h4.png'
import service_5 from '../../assets/h6.png'

const Services = () => {
  return (
    <div className='services'>
        
        <div className='service'>
            <img src={service_2} alt="" />
            <div className="caption">
                
            </div>
        </div>
        <div className='service'>
            <img src={service_3} alt="" />
            <div className="caption">
               
            </div>
        </div>
        <div className='service'>
            <img src={service_4} alt="" />
            <div className="caption">
              
            </div>
        </div>
        <div className='service'>
            <img src={service_5} alt="" />
            <div className="caption">
                
            </div>
        </div>
    </div>  
  )
}

export default Services
