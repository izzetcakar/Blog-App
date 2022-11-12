import React, { useContext, useState } from "react";
import "../styles/app.scss";
import logo from "../styles/logo.png";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AuthContext from "../context/authContext";
import axios from "axios";

const Profile = () => {
  const { user, login } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    username: user.username,
    email: user.email,
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
      await axios.put(`/users/update/${user.id}`, inputs);
      await login(inputs);
      alert("User has been updated");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="LoginContainer" style={{ backgroundColor: "white" }}>
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
                placeholder={user.username}
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
                placeholder={user.email}
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
            Edit Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
