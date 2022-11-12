import express from 'express';
import { register, login, logout, update } from '../controllers/user.js';

const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/logout", logout);
route.put("/update/:id", update);

export default route;