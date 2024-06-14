import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify';
import { useNavigate, Link } from "react-router-dom";
const AdminContacts = () => {
  const navigate = useNavigate();
  const [contacts,setcontacts] = useState([]);
  const {authorizationToken} = useAuth();
    //Functio to delete the Contact
    const deleteContact = async(id)=>{
      console.log(id);
      try {
        const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`,{
          method:"DELETE",
          headers : {
            Authorization : authorizationToken,
          },
        });
        const data = await response.json();
        // console.log(`users after delete ${data}`);
        if(response.ok){
          getAllContacts();
          toast.success("Contact deleted successfully🌕");
        }
       
      } catch (error) {
        console.log(error);
       
      }
  
    }
  const getAllContacts = async()=>{
    try {
      const response = await fetch("http://localhost:5000/api/admin/contacts",{
        method:"GET",
        headers : {
          Authorization : authorizationToken,
        },
      });
      if(!response.ok){
        toast.error("This page is only Accessible to Admin 🌑");
        navigate("/");
       }
        const data = await response.json();
        // console.log(`Users data ${data}`);
        setcontacts(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getAllContacts();
  },[]);

    return (
      <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin User Data</h1>
        </div>
        <div className="container admin-contacts">
        <table>
        <thead className='contact-table'>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {contacts.map((curContacts, index)=>{
          const{username, email, message} = curContacts;
          return (
            <tr key={index}>
            <td>{username}</td>
            <td>{email}</td>
            <td>{message}</td>
            <td>
              <button onClick={()=>deleteContact(curContacts._id)}>Delete</button>
            </td>
            </tr>
          )
        })}
        </tbody>
        </table>
        
        </div>
      </section>
      </>
    )
  }
  

export default AdminContacts