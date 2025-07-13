import React, { useContext, useRef, useState } from "react";
import assets from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const inputRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  axios.defaults.withCredentials = true;

  const {  backendUrl } =
    useContext(AppContext);

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

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/send-reset-otp?email=${encodeURIComponent(email)}`
      );

      if (response.status === 200) {
        toast.success("Password reset OTP sent successfully");
        setIsEmailSent(true);
      } else {
        toast.error("Something went wrong,please try again");
      }
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = () => {
    const otp = inputRef.current.map((input) => input.value).join("");
    if (otp.length !== 6) {
      toast.error("Please enter a valid OTP");
      return;
    } else {
      setOtp(otp);
      toast.success("OTP verified successfully");
      setIsOtpSubmitted(true);
    }
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(backendUrl + "/reset-password", {
        email,
        otp,
        newPassword,
      });
      if (response.status === 200) {
        toast.success("Password reset successfully");
        navigate("/login");
      } else {
        toast.error("Something went wrong,please try again");
      }
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="email-verify-container d-flex align-items-center justify-content-center vh-100 position-relative"
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
      {/* card for reset otp */}
      {!isEmailSent && (
        <div
          className="rounded-4 p-5 text-center bg-white"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <h4 className="mb-2 ">Reset password</h4>
          <p className="mb-4">Enter your registered email address</p>

          <form onSubmit={onSubmitEmail}>
            <div className="input-group mb-4 bg-secondary bg-opacity-10 rounded-pill ">
              <span className="input-group-text bg-transparent  border-0 ps-4">
                <i className="bi bi-envelope-fill"></i>
              </span>
              <input
                type="email"
                className=" border-0  bg-transparent  ps-1 pe-4 rounded-end"
                ref={(el) => (inputRef.current[0] = el)}
                placeholder="Enter your email address"
                style={{ height: "50px", outline: "none" }}
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary w-100 py-2"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Send OTP"}
            </button>
          </form>
        </div>
      )}
      {/* card for otp */}

      {!isOtpSubmitted && isEmailSent && (
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
      )}
      {/* */}
      {isOtpSubmitted && isEmailSent && (
        <div
          className="rounded-4 p-4 text-center bg-white "
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h4>New Password</h4>
          <p>Enter your new password below</p>
          <form onSubmit={onSubmitNewPassword}>
            <div className="mb-4 input-group bg-secondary bg-opacity-10 rounded-pill">
              <span className="input-group-text bg-transparent  border-0 ps-4">
                <i className="bi bi-person-fill-lock"></i>
              </span>
              <input
                type="password"
                className=" border-0  bg-transparent  ps-1 pe-4 rounded-end"
                placeholder="***********"
                style={{ height: "50px", outline: "none" }}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary w-100 py-2"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Reset Password"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
