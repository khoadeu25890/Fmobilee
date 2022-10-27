import express from "express";
// middleware

import { authCheck, adminCheck } from "../middleware/auth.js";
// import Controller
import { createOrUpdateUser, currentUser } from "../controller/auth.js";

const myMiddleware = (req, res, next) => {
  console.log("I am a middlware");
  next();
};

const authRoute = express.Router();
authRoute.post("/create-or-update-user", authCheck, createOrUpdateUser);
authRoute.post("/current-user", authCheck, currentUser);
authRoute.post("/current-admin", authCheck, adminCheck, currentUser);

export default authRoute;
