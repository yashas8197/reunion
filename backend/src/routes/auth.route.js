import express from "express";
import {
  loginUser,
  logoutUser,
  userSignUp,
} from "../contollers/user.controller.js";
import veriftJWT from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/signup", userSignUp);
authRouter.post("/login", loginUser);
authRouter.post("/logout", veriftJWT, logoutUser);

export default authRouter;
