import express from "express";
import type { Router } from "express";
import SignUp from "../controller/SignUp.ts";

const SignUpRouter: Router = express.Router();
SignUpRouter.post("/user/signup", SignUp);

export default SignUpRouter;