import React from 'react'
import {BrowserRouter,Routes,Route, Router} from "react-router-dom";
import {Navbar} from './Components/Navbar';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Services } from './pages/Services';
import Footer from './Components/Footer';
import { Error } from './pages/Error';
import {Logout} from './pages/Logout';
import AdminLayout from './Components/Layouts/AdminLayout';
import AdminUsers from './pages/AdminUsers';
import AdminContacts from './pages/AdminContacts';
import AdminUpdate from './pages/AdminUpdate';
const App = () => {

      return(
        <>
          <BrowserRouter>
          <Navbar/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/contact" element={<Contact/>}/>
              <Route path="/Services" element={<Services/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path='/logout' element={<Logout/>}></Route>
              <Route path="*" element={<Error/>}/>
              <Route path='/admin' element={<AdminLayout/>}> 
                <Route path='users' element={<AdminUsers/>}></Route>
                <Route path='contacts' element={<AdminContacts/>}></Route>
                <Route path='users/:id/edit' element={<AdminUpdate/>}></Route>
              </Route>
            </Routes>
            <Footer/>
          </BrowserRouter>
        </>
      );

};

export default App
