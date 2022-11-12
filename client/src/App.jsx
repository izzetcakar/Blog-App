import React from "react";
import "./styles/app.scss";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ErrorPage from "./pages/ErrorPage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";
import AuthContext from "./context/authContext";
import { useContext } from "react";

const Layout = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return (
      <div className="Container">
        <Sidebar />
        <div className="Pages">
          <Navbar />
          <div className="Page">
            <Outlet />
          </div>
        </div>
      </div>
    );
  } else {
    return <Register />;
  }
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Post />,
      },
      {
        path: "/write",
        element: <CreatePost />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
