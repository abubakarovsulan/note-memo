require('dotenv').config();
const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const expressSession = require("express-session");
const routes = require("./routing/routes.js");

// init (+ Middleware)
const app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

// view engine setup
app.set("view engine", "ejs");

// routing
app.use("/", routes);

// config passport
const User = require("./models/user");
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// conntect to mongoDB
mongoose.connect(process.env.MONGODB_URI);

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server listens on PORT: " + PORT));