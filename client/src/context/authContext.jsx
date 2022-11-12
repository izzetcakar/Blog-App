import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [search, setSearch] = useState("");

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("/users/login", inputs);
    setUser(res.data);
  };

  const logout = async (inputs) => {
    await axios.post("/users/logout");
    setUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const values = {
    user,
    setUser,
    login,
    logout,
    search,
    setSearch,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export default AuthContext;
