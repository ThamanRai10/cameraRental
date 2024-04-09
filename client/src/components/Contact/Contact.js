import React from 'react'
import './contact.css'
import msg_icon from "../../assets/msg-icon.png"
import mail_icon from "../../assets/mail-icon.png"
import phone_icon from "../../assets/phone-icon.png"
import location_icon from "../../assets/location-icon.png"
import white_arrow from "../../assets/white-arrow.png"

const Contact = () => {
    const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "1a88e50f-b006-4b87-a36b-d8795aa7775c");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    
    <div className='contact'>
      <div className="contact-col">
        <h3>Send us a message <img src={msg_icon} alt="" /></h3>
        <p>Feel free to reach out through contact form or find our contact
            information below. Your feedback, questions, and suggestion are
            important to us as we strive to provide exceptional service to our 
            Camera Rental Community.
        </p>
        <ul>
            <li> <img src={mail_icon} alt=""/> CameraRental@gmail.np</li>
            <li> <img src={phone_icon} alt=""/> +977-9825903729</li>
            <li> <img src={location_icon} alt=""/> Koteshwor, Kathmandu</li>

        </ul>
      </div>
      <div className="contact-col">
        <form onSubmit={onSubmit}>
            <label>Your Name</label>
            <input type='text' name='name' placeholder='Enter Your Name' required/>
            <label>Phone Number</label>
            <input type='Tel' name='phone' placeholder='Enter your Phone Number' required/>
            <label>Write your messages here</label>
            <textarea name='message' rows="6" placeholder='Enter your message' required></textarea>
            <button type='submit' className='btn'>Submit Now <img src={white_arrow} alt="" /></button>
        </form>
        <span>{result}</span>
        </div>
    </div>
  )
}

export default Contact
