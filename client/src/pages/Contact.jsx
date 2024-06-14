import React from "react";
import { useState } from "react";
import { useAuth} from "../store/auth";
import { toast } from 'react-toastify';

export const Contact = () => {
  const [contact, setContact] = useState({
    username: " ",
    email: " ",
    message: " ",
  });

  const [userData,setUserData] = useState(true);
  const {user} = useAuth();

  if(userData && user){
    setContact({
      username:user.username,
      email: user.email,
      message:"",
    });
    setUserData(false);
  }
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    // setContact({
    //   ...contact,[name]:value,
    // });
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(contact);
    try {
      const response = await fetch(`http://localhost:5000/api/form/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });
      const res_data=await response.json();
      // console.log(res_data);
      if (response.ok) {
        toast.success("Message sent successfully🥰");
        setContact({ username: "", email: "", message:""});
      }else{
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
      console.log(response);
    } catch (error) {
      console.log("register", error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image regis-form">
                <img
                  src="/images/register.png"
                  alt="Regisatration"
                  width="500"
                  height="400"
                />
              </div>
              <div className="registration-form regis-form">
                <h1 className="main-heading mb-3">Contact Us</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div className="input">
                    <label htmlFor="username">User Name</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      id="username"
                      required
                      autoComplete="off"
                      value={contact.username}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="input">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your Email id"
                      id="email"
                      required
                      autoComplete="off"
                      value={contact.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="input">
                    <label htmlFor="message">Message</label>
                    <textarea
                      rows={5}
                      cols={30}
                      type="text"
                      name="message"
                      placeholder="Type your query here"
                      id="message"
                      required
                      autoComplete="off"
                      value={contact.message}
                      onChange={handleInput}
                    />
                  </div>
                  <br />
                  <button type="sunmit" className="btn btn-submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <section className="mb-3 loc">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.56659308076!2d77.46612568471338!3d12.95428023675772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1712316446920!5m2!1sen!2sin"
                width="600"
                height="450"
                style={{ border: "0", width: "100%" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </section>
          </div>
        </main>
      </section>
    </>
  );
};
