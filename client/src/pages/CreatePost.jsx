import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
import "../styles/app.scss";

const CreatePost = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      await axios.post(`/posts/`, {
        title,
        description: value,
        image: file ? imgUrl : "",
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      });

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="CreatePostContainer">
      <input
        type="text"
        className="Title"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="Editor">
        <ReactQuill
          className="editor"
          value={value}
          onChange={setValue}
          placeholder="Description"
        />
      </div>
      <div className="bottom">
        <input
          style={{ display: "none" }}
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label className="image" htmlFor="file">
          Upload Image
        </label>
        <button className="submit" onClick={handleClick}>
          Publish
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
