import React, { useState, useContext } from "react";
import "../styles/app.scss";
import logo from "../styles/logo.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AuthContext from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
      alert(err.response.data);
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
            Login
          </button>
          <div className="bottom">
            <Link className="text" to="/register">
              Register
            </Link>
            <div className="text">Forgot Password?</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
