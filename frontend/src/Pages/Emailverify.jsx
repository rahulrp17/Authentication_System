import React, { useContext, useEffect, useRef, useState } from "react";
import assets from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Emailverify = () => {
  const inputRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const { getUserData, isLoggedIn, userData, backendUrl } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    e.target.value = value;
    if (e.target.value.length < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
    pasteData.forEach((data, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = data;
      }
    });
    const next = pasteData.length < 6 ? pasteData.length : 5;

    inputRef.current[next].focus();
  };

  const handleVerify = async () => {
    const otp = inputRef.current.map((input) => input.value).join("");
    if (otp.length !== 6) {
      toast.error("Please enter a valid OTP");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(backendUrl + "/verify-otp", {
        otp,
      });
      if (response.status === 200) {
        toast.success("Email verified successfully");
        getUserData();
        navigate("/");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to verify OTP. Please try again.");
    }
    setLoading(false);
  };

  useEffect(()=>{
    isLoggedIn && userData && userData.isAccountVerified && navigate("/")
  },[isLoggedIn,userData,navigate])

  return (
    <div
      className="email-verify-container d-flex justify-content-center align-items-center vh-100 position-relative"
      style={{
        background: "linear-gradient(90deg,#6a5af9,#8252f9)",
        borderRadius: "none",
      }}
    >
      <Link
        to="/"
        className="d-flex align-items-center position-absolute top-0 start-0 p-4 text-decoration-none gap-2"
      >
        <img
          src={assets.logo_home}
          className="rounded-2"
          height={32}
          width={32}
          alt=""
        />
        <span className="fw-bold fs-4 text-dark ">Authify</span>
      </Link>
      
      <div className="p-5 rounded-4 shadow bg-" style={{ width: "400px" }}>
        <h4 className="text-center fw-bold mb-2">Email Verify OTP</h4>
        <p className="text-center text-white-50 mb-4">
          Please enter the OTP sent to your email
        </p>
        <div className="d-flex justify-content-center text-center text-white-50 mb-4 gap-2">
          {[...Array(6)].map((_, index) => (
            <input
              ref={(el) => (inputRef.current[index] = el)}
              key={index}
              type="text"
              maxLength="1"
              className="form-control text-center otp-input"
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
            />
          ))}
        </div>
        <button
          className="btn btn-primary w-100 fw-semibold"
          disabled={loading}
          onClick={handleVerify}
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>
      </div>
    </div>
  );
};

export default Emailverify;
