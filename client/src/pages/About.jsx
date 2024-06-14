import React from 'react'
import { Analytics } from '../Components/Analytics'
import { useAuth} from "../store/auth";
export const About = () => {
  const {user} = useAuth();
  return (
    <>
    <section className="section-hero">
    <div className="container grid grid-two-cols">
      <div className="hero-content">
        <p>Welcome to HP Consultancy</p>
        <p>welcome
        {user?` ${user.username} to our website`:`to our website`}</p>
        <h1>Why Choose us?</h1>
        <p>
          Are you ready to your business to the next level with cutting-edge IT solution?
          Look no further! At HP Consultancy,we specialize in providing innovative IT services and solutions
          tailored to meet your unique needs. Our team of experts is here to help guide.
        </p>

        <div className="btn btn-group">
        <a href="/contact"><button className="btn">Connect Now</button></a>
        <a href="/services"><button className="btn secondary-btn">Learn more</button></a>
      </div>
      </div>
     
      <div className="hero-image">
        <img 
        src="/images/register.png" 
        alt="Home page"
        width="500"
        height="500" />
      </div>

    </div>
   </section>
   <Analytics/>
    </>
  

   
  )
}


