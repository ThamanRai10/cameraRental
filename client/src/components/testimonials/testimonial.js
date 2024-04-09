import React from 'react';
import './testimonial.css';
import next_icon from '../../assets/next-icon.png';
import back_icon from '../../assets/back-icon.png';
import user_1 from '../../assets/user-1.png';
import user_2 from '../../assets/user-2.png';
import user_3 from '../../assets/user-3.png';
import user_4 from '../../assets/user-4.png';

const testimonial = () => {
    // const slider = useRef();
    // let tx = 0;

    // const slideForward = () =>{
    //     if(tx > -50){
    //         tx -= 25;
    //     }
    //     slider.current.style.transform = `translateX(${tx}%)`

    // }

    // const slideBackward = () =>{
    //     if(tx < -25){
    //         tx += 25;
    //     }
    //     slider.current.style.transform = `translateX(${tx}%)`
    // }


  return (
    <div className='Testimonials'>
        <img src={next_icon} alt="" className='naxt-btn' />
        <img src={back_icon} alt="" className='back-btn'   />
        <div className="slider">

        
        <ul>
            <li>
                <div className="slide">
                    <div className="user-info">
                        <img src={user_1} alt="" />
                        <div>
                            <h3>Soniya Shrestha</h3>
                            <span>Kathmandu</span>

                        </div>
                    </div>
                    <p>My experience with the camera rental system was absolutely fantastic. As an amateur photographer, 
                        I was initially apprehensive about renting equipment, but the process was incredibly smooth and hassle-free. The website interface was intuitive, 
                        allowing me to browse through a wide selection of cameras and accessories with ease. The rental rates were reasonable, and the equipment 
                        was in excellent condition. Overall, it was a seamless experience, and I would highly recommend the camera rental system to anyone looking for quality
                         equipment without breaking the bank.</p>
                </div>
            </li>
            <li>
                <div className="slide">
                    <div className="user-info">
                        <img src={user_2} alt="" />
                        <div>
                            <h3>Prabin Ghale</h3>
                            <span>Gorkha</span>

                        </div>
                    </div>
                    <p>My experience with the camera rental system was absolutely fantastic. As an amateur photographer, 
                        I was initially apprehensive about renting equipment, but the process was incredibly smooth and 
                        hassle-free. The website interface was intuitive, 
                        allowing me to browse through a wide selection of cameras and accessories with ease. 
                        The rental rates were reasonable, and the equipment 
                        was in excellent condition. Overall, it was a seamless experience, and I would highly 
                        ecommend the camera rental system to anyone looking for quality
                         equipment without breaking the bank.</p>
                </div>
            </li>
            <li>
                <div className="slide">
                    <div className="user-info">
                        <img src={user_3} alt="" />
                        <div>
                            <h3>Kamana Budhathoki</h3>
                            <span>Kathmandu</span>

                        </div>
                    </div>
                    <p>"I've been a loyal user of the camera rental system for several years now,
                         and I can confidently say that it has never failed to exceed my 
                         expectations. Whether I'm working on a professional photoshoot or
                        capturing memories on vacation, the camera rental system provides me
                        with the perfect equipment for every occasion. The website offers
                        a comprehensive range of cameras, lenses, and accessories, catering
                        to photographers of all skill levels. The customer service team is also
                        top-notch, always ready to assist with any queries or concerns. Overall,
                        I'm extremely satisfied with my experience and wouldn't hesitate to
                        recommend the camera rental system to fellow photographers."</p>
                </div>
            </li>
            <li>
                <div className="slide">
                    <div className="user-info">
                        <img src={user_4} alt="" />
                        <div>
                            <h3>Parash </h3>
                            <span>Janakpur</span>

                        </div>
                    </div>
                    <p>"Finding the right camera equipment for my photography projects 
                        used to be a daunting task until I discovered the camera rental 
                        system. The platform simplifies the entire rental process, 
                        allowing me to browse through a diverse selection of high-quality 
                        gear from the comfort of my home. Whether I need a professional 
                        DSLR for a commercial shoot or a compact camera for a personal 
                        project, the camera rental system has everything I need. 
                        The rental rates are affordable, and the equipment is always 
                        well-maintained. With fast delivery and easy returns, it's 
                        the perfect solution for photographers seeking flexibility 
                        and convenience.".</p>
                </div>
            </li>
        </ul>  
    </div>
    </div>
  )
}

export default testimonial
