import React, { useState } from "react";
import "../styles/app.scss";
import logo from "../styles/logo.png";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  let navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.password.length < 6) {
      return alert("Password has to be at least 6 characters");
    }
    try {
      await axios.post("/users/register", inputs);
      navigate("/login");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="LoginContainer">
      <div className="Content">
        <img alt="..." src={logo} className="Image"></img>
        <form className="LoginForm">
          <div className="Element">
            <div className="Title">Username</div>
            <div className="valueContainer">
              <AccountCircleOutlinedIcon sx={{ color: "#4d4d4d" }} />
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="Value"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="Element">
            <div className="Title">E-mail Address</div>
            <div className="valueContainer">
              <EmailOutlinedIcon sx={{ color: "#4d4d4d" }} />
              <input
                type="email"
                id="email"
                placeholder="Username@gmail.com"
                className="Value"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="Element">
            <div className="Title">Password</div>
            <div className="valueContainer">
              <LockOutlinedIcon sx={{ color: "#4d4d4d" }} />
              <input
                type="password"
                id="password"
                placeholder=".............."
                className="Value"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <button type="submit" className="submit" onClick={handleSubmit}>
            Register
          </button>
          <div className="bottom">
            <Link className="text" to="/login">
              Login
            </Link>
            <div className="text">Forgot Password?</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
