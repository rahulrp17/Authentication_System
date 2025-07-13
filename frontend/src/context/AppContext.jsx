import { createContext, useEffect, useState } from "react";
import { AppConstants } from "../Util/Constant";
import axios from "axios";
import { toast } from "react-toastify";

 const AppContext = createContext();

export const AppProvider = ({ children }) => {

    useEffect(() => {
        
        axios.defaults.withCredentials = true
    })

    const backendUrl = AppConstants.BACKEND_URL
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState(null)
    const [isAccountCreated, setIsAccountCreated] = useState(false);

    const getUserData=async()=>{

        try{
            const response =await axios.get(`${backendUrl}/profile`);
            console.log(response)
            if(response.status===200){
                setUserData(response.data)
            }else{
                toast.error("Unable to retrieve the profile")
            }
        }catch(err){
            toast.error(err.message)
        }
    }

    const contextValue = {
        
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData,
        isAccountCreated,
        setIsAccountCreated
    };

    const getAuthState=async()=>{
          
        try{

            const response =await axios.get(backendUrl+"/is-authenticated");

            if(response.status===200){
                setIsLoggedIn(true)
              await  getUserData()
            }else{
                setIsLoggedIn(false)
            }

        }catch(error){
    
            console.log(error)
           
        }
    }

    useEffect(()=>{
        getAuthState()
    },[])


    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default AppContext