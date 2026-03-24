const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middelware");
const userController = require("../controllers/users.js");

//SignUp Page
//SignUp Request
router
.route("/signup")
.get(userController.RenderSignupForm)
.post(userController.signupForm );


//Login Page
//Login Request
router
.route("/login")
.get(userController.renderLoginPage)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.userLogin);

//Logout Page
router.get("/logout",userController.userLogout)


module.exports = router;