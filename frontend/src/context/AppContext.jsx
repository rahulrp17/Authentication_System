import { createContext, useEffect, useState } from "react";
import { AppConstants } from "../Util/Constant";
import axios from "axios";
import { toast } from "react-toastify";

//  Set this globally — applies to all requests
axios.defaults.withCredentials = true;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const backendUrl = AppConstants.BACKEND_URL;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAccountCreated, setIsAccountCreated] = useState(false);

  //  Fetch user profile after login or on app load
  const getUserData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/profile`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUserData(response.data);
      } else {
        toast.error("Unable to retrieve the profile");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load profile");
    }
  };

  // Check if user is authenticated on load
  const getAuthState = async () => {
    try {
      const response = await axios.get(`${backendUrl}/is-authenticated`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
        await getUserData();
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log("Auth check error:", error?.response?.data?.message || error.message);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const contextValue = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    isAccountCreated,
    setIsAccountCreated,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
