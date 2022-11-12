import React, { useContext } from "react";
import "../styles/app.scss";
import SearchIcon from "@mui/icons-material/Search";
import AuthContext from "../context/authContext";
import { useEffect } from "react";

const Navbar = () => {
  const { user, search, setSearch } = useContext(AuthContext);

  return (
    <div className="Navbar">
      <div className="SearchContainer">
        <div className="InputContainer">
          <input
            className="Input"
            placeholder={"Search...."}
            onChange={({ target }) => setSearch((prev) => target.value)}
          ></input>
          <div className="Icon">
            <SearchIcon style={{ color: "gray", fontSize: 25 }} />
          </div>
        </div>
      </div>

      <div className="Username">{user.username}</div>
    </div>
  );
};

export default Navbar;
