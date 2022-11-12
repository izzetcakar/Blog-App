import axios from "axios";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/authContext";
import "../styles/app.scss";

const Post = () => {
  let navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState({});
  let { id } = useParams();

  useEffect(() => {
    getPost();
  }, [id]);

  const getPost = async () => {
    try {
      const res = await axios.get(`/posts/${id}`);
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async () => {
    try {
      await axios.delete(`/posts/${id}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const parseDesc = (html) => {
    const description = new DOMParser().parseFromString(html, "text/html");
    return description.body.textContent;
  };

  return (
    <div className="SinglePostContainer">
      {user.id === post.userid && (
        <div className="changePost">
          <div className="choice" onClick={deletePost}>
            DELETE
          </div>
        </div>
      )}
      {post && (
        <div key={post.id} className="PostContainer">
          <img src={`../upload/${post.image}`} alt="" className="Image"></img>
          <div className="Title">{post.title}</div>
          <p className="Description">{parseDesc(post.description)}</p>
        </div>
      )}
    </div>
  );
};

export default Post;
