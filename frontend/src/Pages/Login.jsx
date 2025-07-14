import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import axios from "axios";
import AppContext from "../context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    backendUrl,
    setIsLoggedIn,
    getUserData,
    setIsAccountCreated,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    setLoading(true);

    try {
      if (isCreateAccount) {
        const response = await axios.post(`${backendUrl}/register`, {
          name,
          email,
          password,
        });

        if (response.status === 201) {
          navigate("/");
          setIsAccountCreated(true);
          toast.success("Account created successfully");
        } else {
          toast.error("Email already exists");
        }
      } else {
        const response = await axios.post(`${backendUrl}/login`, {
          email,
          password,
        });

        if (response.status === 200) {
          setIsLoggedIn(true);
          navigate("/");
          getUserData();
          toast.success("Login successful");
        } else {
          toast.error("Email or password is incorrect");
          setIsLoggedIn(false);
        }
      }
    } catch (error) {
      console.error("Login/Register Error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="position-relative min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(90deg,#6a5af9,#8268f9)",
        border: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "30px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "24px",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <img
            className="rounded-pill"
            src={assets.logo_home}
            height={50}
            width={50}
            alt="logo"
          />
          <span className="fw-bold fs-4 text-dark">Authify</span>
        </Link>
      </div>

      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-3">
          {isCreateAccount ? "Create Account" : "Login"}
        </h2>

        <form onSubmit={onSubmitHandler}>
          {isCreateAccount && (
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Your Name"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Your Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="**********"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              style={{ cursor: "pointer" }}
              id="exampleCheck1"
              required
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100"
          >
            {loading ? "Loading..." : isCreateAccount ? "SignUp" : "Login"}
          </button>

          <div className="d-flex justify-content-between mb-1">
            <Link
              to="/reset-password"
              className="text-end d-block mt-3 text-decoration-none"
            >
              Forgot Password
            </Link>
          </div>

          <div className="text-center mt-4 position-relative">
            {isCreateAccount ? (
              <p>
                Already have an account?{" "}
                <span
                  className="text-primary text-decoration-none"
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsCreateAccount(false)}
                >
                  Login
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <span
                  className="text-primary text-decoration-none"
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsCreateAccount(true)}
                >
                  SignUp
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
