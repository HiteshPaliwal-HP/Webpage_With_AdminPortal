import {React} from 'react'
import { useEffect } from 'react'
import { FaUser } from "react-icons/fa";
import { MdContacts } from "react-icons/md";
import {NavLink, Outlet,Navigate} from "react-router-dom"
import { MdMiscellaneousServices } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';
const AdminLayout =  () => {
  const {user,isLoading} = useAuth();
  if(isLoading){
    return <h1>Loading...</h1>
  }
  // console.log("Admin Layout", user);
  // use id loading till we get backend data wait till render
  if(!user.isAdmin){
    toast.error("This is only Accessible to Admin");
    return <Navigate to="/" />
  }
  return (
    <>
      <header>
      <div className="container">
      <nav>
        <ul>
          <li>
         <NavLink to="/admin/users"><FaUser />Users</NavLink> </li>
          <li> <NavLink to="/admin/contacts"><MdContacts />Contacts</NavLink></li>
          <li> <NavLink to="/services"><MdMiscellaneousServices />Services</NavLink></li>
          <li> <NavLink to="/"><IoHome />Home</NavLink></li>
        </ul>
        </nav>
      </div>
    </header>
    <Outlet />
    </>
  )
}

export default AdminLayout