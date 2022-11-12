import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/app.scss";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import { useContext } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useContext(AuthContext);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const res = await axios.get(`/posts`);
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const parseDesc = (html) => {
    const description = new DOMParser().parseFromString(html, "text/html");
    return description.body.textContent;
  };

  return (
    <div className="HomeContainer">
      {posts &&
        posts
          .filter((item) => {
            if (search === "") return item;
            else if (item.title.toLowerCase().includes(search.toLowerCase()))
              return item;
          })
          .map((item) => (
            <div key={item.id} className="PostContainer">
              <img
                src={`../upload/${item.image}`}
                alt=""
                className="Image"
              ></img>
              <Link className="Title" to={`/post/${item.id}`}>
                {item.title}
              </Link>
              <p className="Description">{parseDesc(item.description)}</p>
            </div>
          ))}
    </div>
  );
};

export default Home;
