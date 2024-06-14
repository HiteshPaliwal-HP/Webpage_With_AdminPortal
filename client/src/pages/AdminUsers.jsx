import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify';
import { useNavigate, Link } from "react-router-dom";
const AdminUsers = () => {
  const navigate = useNavigate();
  const [admin,setadmin]=useState(0);
  const [users,setUers] = useState([]);
  const {authorizationToken} = useAuth();
  //Functio to delete the use
  const deleteUser = async(id)=>{
    // console.log(id);
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`,{
        method:"DELETE",
        headers : {
          Authorization : authorizationToken,
        },
      });
      const data = await response.json();
      // console.log(`users after delete ${data}`);
      if(response.ok){
        getAllUsersData();
        toast.success("User deleted successfully🌕");
      }
     
    } catch (error) {
      console.log(error);
     
    }

  }
  const getAllUsersData = async()=>{
    try {
      const response = await fetch("http://localhost:5000/api/admin/users",{
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
      setUers(data);
      // console.log(users);
     
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getAllUsersData();
  },[]);

    return (
      <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin User Data</h1>
        </div>
        <div className="container admin-users">
        <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {users.map((curUser, index)=>{
          return (
            <tr key={index}>
            <td>{curUser.username}</td>
            <td>{curUser.email}</td>
            <td>{curUser.phone}</td>
            <td>
            <Link to={`/admin/users/${curUser._id}/edit`}> Edit</Link>
           </td>
            <td>
              <button onClick={()=>deleteUser(curUser._id)}>Delete</button>
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
  

export default AdminUsers