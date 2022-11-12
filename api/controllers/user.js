import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const q = "SELECT * FROM user WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.json("User is already exists");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const q = "INSERT INTO user(`username`,`email`,`password`) VALUES (?)";
    const values = [username, email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  const username = req.body.username;
  const basicPassword = req.body.password;
  const q = "SELECT * FROM user WHERE username = ?";

  db.query(q, [username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User is not found");

    const isPasswordCorrect = bcrypt.compareSync(
      basicPassword,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password");

    const token = jwt.sign({ id: data[0].id }, "jwtSecretKey");
    const { password, ...other } = data[0];

    res.cookie("access_token", token, {
      httpOnly: true,
    })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  }).status(200).json("User has been logged out")
};

export const update = (req, res) => {
  const token = req.cookies.access_token;
  const userId = req.params.id;
  if (!token) return res.json("User is not authenticated");

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const q = "SELECT * FROM user WHERE `email` = ? AND `id` != ?";
  const p = "SELECT * FROM user WHERE `username` = ? AND `id` != ?";

  db.query(q, [email, userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.json("Email is taken by someone else");
    db.query(p, [username, userId], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.json("Username is taken by someone else");

      jwt.verify(token, "jwtSecretKey", (err, userData) => {
        if (err) return res.json("Token is not valid!");

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const z = "UPDATE user SET `username`=?,`email`=?,`password`=? WHERE `id` = ?";

        db.query(z, [username, email, hash, userData.id], (err, lastData) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("updated");
        });
      });

    });
  });
}