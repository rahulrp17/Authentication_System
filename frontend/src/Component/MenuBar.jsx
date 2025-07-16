import { useContext, useEffect, useRef, useState } from "react";
import assets from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const MenuBar = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropDownRef = useRef(null);
  const { userData, setIsLoggedIn, setUserData, backendUrl,isAccountCreated } =
    useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setDropDownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const logoutHandler = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${backendUrl}/logout`);
      if (response.status === 200) {
        setIsLoggedIn(false);
        setUserData(null)
        navigate("/");
        toast.success("Logout successful");
      } else {
        toast.error("Unable to logout");
      }
    } catch (err) {
       toast.error(err?.response?.data?.message || "Logout failed");
    }
  };

  const sendVerificationOtp = async () => {
    try {
      const response = await axios.post(`${backendUrl}/send-otp`);
      if (response.status === 200) {
        navigate("/email-verify");
        toast.success("OTP sent successfully");
      } else {
        toast.error("Unable to send OTP");
      }
    } catch (err) {
      console.log(err.message);
     toast.error(err?.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <nav className="navbar bg-white px-3 py-2 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-2">
        <img
          className=""
          width={50}
          height={50}
          src={assets.logo_home}
          alt=""
        />
        <span className="fw-bold fs-4 text-dark ">Authify</span>
      </div>
      {userData ? (
        <div className="position-relative" ref={dropDownRef}>
          <div
            className="bg-dark text-white rounded-circle d-flex justify-content-center align-items-center"
            style={{
              width: "40px",
              height: "40px",
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={() => setDropDownOpen((prev) => !prev)}
          >
            {userData.name?.charAt(0).toUpperCase() || ""}
          </div>
          {dropDownOpen && (
            <div
              className="position-absolute  shadow rounded  px-3"
              style={{ top: "50px", right: "0", zIndex: "100" }}
            >
              {!userData.isAccountVerified && (
                <div
                  className="dropdown-item py-1 py-2 text-center"
                  style={{ cursor: "pointer" }}
                  onClick={sendVerificationOtp}
                >
                  Verify Email
                </div>
              )}
              <div
                className="dropdown-item pb-2  text-danger text-start"
                style={{ cursor: "pointer" }}
                onClick={logoutHandler}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className="btn btn-outline-dark  rounded-pill px-3"
          onClick={() => navigate("/login")}
        >
         {isAccountCreated? "Login" : "SignUp"}
          <i className="bi bi-arrow-right ms-2"></i>
        </div>
      )}
    </nav>
  );
};

export default MenuBar;
