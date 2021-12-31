const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// scheme
const userScheme = mongoose.Schema({username: String, password: String, notes: [{title: String, content: String, quote: String}]});

// use the passport-local-mongoose plugin for authentication purposes
userScheme.plugin(passportLocalMongoose);

// model derived by the scheme
module.exports = mongoose.model("User", userScheme);