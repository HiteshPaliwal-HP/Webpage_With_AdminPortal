import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import { useNavigate, Link } from "react-router-dom";
const AdminUpdate = ()=>{

  const navigate = useNavigate();
    const [data,setData] = useState({
        username:"",
        email:"",
        phone:"",
    });

const handleInput = (e)=>{
    let name = e.target.name;
    let value = e.target.value;
    setData({
        ...data,
        [name]:value,
    })
}

const params = useParams();
const {authorizationToken} = useAuth();
//Function to get single user data
const getSingleUserData = async(id)=>{
    // console.log(id);
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`,{
        method:"GET",
        headers : {
          Authorization : authorizationToken,
        },
      });
      const data = await response.json();
    //   console.log(`user single data :  ${data}`);
      setData(data);
    } catch (error) {
      console.log(error);
     
    }

  }
 

useEffect(()=>{
 getSingleUserData();   
},[]);


//To upate the data Dynamically 
const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
        
        const response = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`,{
        method:"PATCH",
        headers : {
          Authorization : authorizationToken,
          "Content-Type": "application/json",
        },
        body:JSON.stringify(data),
      });
      
    //   const data = await response.json();
    //   console.log(`users after update ${data}`);
      if(response.ok){
        toast.success("User Updated successfully🌕");
        navigate("/admin/users");

      }else{
        toast.error("User not Updated");
      }
    } catch (error) {
        console.log(`Error from handleSubmit ${error}`);
    }
 } 
return(
   <>
     <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-form regis-form">
                <h1 className="main-heading mb-3">Update User</h1>
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
                      value={data.username}
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
                      value={data.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="input">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="phone"
                      name="phone"
                      placeholder="Enter your Phone"
                      id="phone"
                      required
                      autoComplete="off"
                      value={data.phone}
                      onChange={handleInput}
                    />
                  </div>
                  <br />
                  <button type="sunmit" className="btn btn-submit">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
   </>
)

}


export default AdminUpdate;