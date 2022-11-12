import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//CSS
import "../styles/app.scss";
//ICONS
import logo from "../styles/logo.png";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import CreateIcon from "@mui/icons-material/Create";
import AuthContext from "../context/authContext";
import { useState } from "react";

const Sidebar = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const [iconBg, setIconbg] = useState([
    {
      name: "",
      isUserHere: true,
    },
    {
      name: "write",
      isUserHere: false,
    },
    {
      name: "profile",
      isUserHere: false,
    },
  ]);
  const { user, logout } = useContext(AuthContext);

  const iconBgHandler = (input) => {
    var locations = location.pathname.split("/");
    if (locations[1] === input) return "#020241";
    return "white";
  };

  const changeRoute = (path) => {
    navigate(path);
  };

  const iconStyle = {
    color: "rgb(69,112,130)",
    width: "60%",
    height: "auto",
  };

  return (
    <div className="SidebarContainer">
      <img alt="..." src={logo} className="Logo"></img>
      <div className="Elements">
        <div className="Element" onClick={() => changeRoute(`/`)}>
          <div className="Icon" style={{ backgroundColor: iconBgHandler("") }}>
            <HomeRoundedIcon sx={iconStyle}></HomeRoundedIcon>
          </div>
          <div className="Title">HOME</div>
        </div>
        <div className="Element" onClick={() => changeRoute(`/write`)}>
          <div
            className="Icon"
            style={{ backgroundColor: iconBgHandler("write") }}
          >
            <CreateIcon sx={iconStyle}></CreateIcon>
          </div>
          <div className="Title">WRITE</div>
        </div>
        <div
          className="Element"
          onClick={() => changeRoute(`/profile/${user.id}`)}
        >
          <div
            className="Icon"
            style={{ backgroundColor: iconBgHandler("profile") }}
          >
            <PersonIcon sx={iconStyle}></PersonIcon>
          </div>
          <div className="Title">PROFILE</div>
        </div>
      </div>
      <div className="Logout" onClick={logout}>
        <LogoutIcon
          sx={{
            color: "#1f343d",
            width: "30%",
            height: "auto",
          }}
        />
        <div className="Exit">Logout</div>
      </div>
    </div>
  );
};

export default Sidebar;
