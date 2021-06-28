const express = require("express");
const authRouter = express.Router();
const { signIn, signUp } = require("../controllers/auth");
const { authenticate } = require("../middlewares/authenticate");

authRouter.post("/signin", signIn);
authRouter.post("/signup", signUp);
module.exports = authRouter;