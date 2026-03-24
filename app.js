if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const app = express();
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const Session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");
const dbUrl = process.env.ATLASDB_URL;




app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());


const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600
});

store.on("error", () => {
    console.log("ERROR in Mongo Session Store", err);
});


//Express Sessions
sessionOptions = {
    store,
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:
    {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }

}



//MongoDB Conection
main()
    .then(() => {
        console.log("DataBase Connected");
    })
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect(dbUrl);
}
// //Home Route
// app.get("/", (req, res) => {
//     res.send("You are In Home Page");
// })

//session middleware
app.use(Session(sessionOptions));
app.use(flash());


//passport session middleware
app.use(passport.initialize());
app.use(passport.session());


passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//session middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

// app.get("/demoUser", async (req, res) => {
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "mayank kaushik"
//     })
//     let registerUser = await User.register(fakeUser, "helloworld");
//     res.send(registerUser)
// })


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);



// 404 handler
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Error handler
app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong" } = err;
    res.status(status).render("error.ejs", { err });
});

//sever conection
app.listen(8080, (req, res) => {
    console.log("server listening at port 8080");
})
