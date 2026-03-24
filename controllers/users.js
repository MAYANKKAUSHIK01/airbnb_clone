const User = require("../models/user.js");

//Render Signup Form
module.exports.RenderSignupForm = (req, res) => {
    res.render("users/signup.ejs")
};


//Signup
module.exports.signupForm =  async (req, res,next) => {
    try {

        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
                req.flash("success", "Welcome To Wanderlust");
                res.redirect("/listings");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};


//Render Login Page
module.exports.renderLoginPage = (req,res)=>{
    res.render("users/login.ejs")
};

//Login
module.exports.userLogin = async(req,res)=>{
    req.flash("success","welcome to Wander")
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl); 
};

//Logout Page 
module.exports.userLogout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","You are logged out !")
        res.redirect("/listings");
    })
};