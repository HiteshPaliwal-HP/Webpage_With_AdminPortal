import { useEffect } from "react";
import { useContext, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [token,setToken] = useState(localStorage.getItem("token"));
    const[user,setUser] = useState("");
    const [isLoading,setisLoading] = useState(true);
    const[services,setServices] = useState([]);
    const authorizationToken = `Bearer ${token}`;
    const storeTokenInLS =(serverToken)=>{
        setToken(serverToken);
        return localStorage.setItem("token",serverToken);
    };
    let isLoggedIn = !!token;
    console.log(`Is Logged in ${isLoggedIn}`);

    //---------------------------------------------
    //**TACKLING THE LOGIUT FUNCTION
    //---------------------------------------------
    const LogoutUser = ()=>{
        setToken("");
        return localStorage.removeItem("token");
    }

    //------------------------------------------------------------------
    //**JWT AUTHENTICATION TO GET THE CURRENLY LOGGED USER DATA
    //------------------------------------------------------------------
    const userAuthentication = async()=>{
        try {
            setisLoading(true);
            const reponse = await fetch("http://localhost:5000/api/auth/user",{
                method:"GET",
                headers:{
                    Authorization:authorizationToken,
                },
            });
            if(reponse.ok){
                const data=await reponse.json();
                console.log('user data from authentication',data.userData);
                setUser(data.userData);
                setisLoading(false);
            }else{
                setisLoading(false);
            }
        } catch (error) {
            console.log("Error fetching user data");
        }
    }

    //---------------------------------------------
    //**TO FETCH THE SERVICES DATA FROM DATA BASE
    //--------------------------------------------
    const getServices = async()=>{

        try {
            const response = await fetch("http://localhost:5000/api/data/services",
            {
                method:"GET",
            });

            if(response.ok){
                const data=await response.json();
                // console.log(data.msg);
                setServices(data.msg);
            }
        } catch (error) {
            console.log(`Services front end Error : ${error}`);
        }
    }

    useEffect(()=>{
        getServices();
        userAuthentication();
    },[]);


    

    //*------------------------------------------------------
    return <AuthContext.Provider value={{isLoggedIn,storeTokenInLS,LogoutUser,user,services,authorizationToken,isLoading}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = ()=>{
    // return useContext(AuthContext); 
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error('useAuth must be used within the AuthProvider');
    }
    return authContextValue; 
}