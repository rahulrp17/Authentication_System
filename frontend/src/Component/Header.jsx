import React, { useContext } from "react";
import assets from "../assets/assets";
import AppContext from "../context/AppContext";

const Header = () => {
  const {userData}=useContext(AppContext)
  return (
    <div
      className="text-center d-flex justify-content-center align-items-center flex-column py-5 px-3"
      style={{ minHeight: "80vh"  }}
    >
      <img src={assets.header} width={200}  alt="" className="mb-4" />
      <h5 className="fw-semibold ">
        Hey {userData?userData.name:"Developer"}{" "}
        <span role="img" aria-label="wave">
          👋🏻
        </span>
      </h5>
      <h1 className="fw-bold display-5 mb-3">Welcome to our product</h1>
      <p className="text-muted fs-5 mb-4" style={{ maxWidth: "500px" }}>
        Let's start with a quick product tour and you can setup the
        authentication in no time!
      </p>
      <button className="btn btn-outline-dark rounded-pill px-4 py-2">
        Get Started
      </button>
    </div>
  );
};

export default Header;
