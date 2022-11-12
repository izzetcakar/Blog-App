import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = "SELECT * FROM post";

  db.query(q, (err, data) => {
    if (err) return res.send(err);

    return res.json(data);
  });
};

export const getPost = (req, res) => {
  const postId = req.params.id;

  const q = "SELECT * FROM post WHERE `id` = ?";

  db.query(q, [postId], (err, data) => {
    if (err) return res.json(err);

    return res.json(data[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.json("Not authenticated!");

  jwt.verify(token, "jwtSecretKey", (err, userInfo) => {
    if (err) return res.json("Token is not valid!");

    const q = "INSERT INTO post(`title`, `description`, `image`, `date`,`userid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.description,
      req.body.image,
      req.body.date,
      userInfo.id,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.json("User is not authenticated");

  jwt.verify(token, "jwtSecretKey", (err, userData) => {
    if (err) return res.json("Token is not valid");

    const postId = req.params.id;
    const q = "DELETE FROM post WHERE `id` = ? AND `userid` = ?";

    db.query(q, [postId, userData.id], (err, data) => {
      return res.json("Post has been deleted");
    });
  });
};