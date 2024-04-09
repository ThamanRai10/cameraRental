import React from 'react'
import Header from "./components/Layout/Header"
import Hero from "./components/Hero/Hero"
import Services from "./components/Services/Services"
import Title from "./components/Title/title"
import About from "./components/about/about"
// import Gallery from './components/Gallery/gallery'
import Contact from './components/Contact/Contact'
import Testimonial from './components/testimonials/testimonial'
import Footer from './components/Layout/Footer'

const Homepage = () => {
    return(
        <div>
            <Header/>
            <Hero/>
            <Title subTitle = 'OUR SERVICES' title='What We Offer' />
            <Services/>
            <About/>
            {/* <Title subTitle = 'Gallery' title='Camera Photos' />
            <Gallery/> */}
            <Title subTitle = 'TESTIMONIALS' title='What Our Customers Says ' />
            <Testimonial/>
            <Title subTitle = 'Contact Us' title='Get in Touch' />
            <Contact/>
            <Footer/>
        </div>
    )
}

export default Homepage