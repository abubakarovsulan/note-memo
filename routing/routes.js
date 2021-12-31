const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();
const axios = require('axios');

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local"), (req, res) => {
    res.redirect("/notes");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    const {
        username,
        password
    } = req.body;
    User.register({
        username: username,
        notes: []
    }, password, (err, user) => {
        if (err) {
            return res.redirect("/register");
        }

        passport.authenticate("local")(req, res, () => {
            res.redirect("/notes");
        });
    })
});

router.get("/notes", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("notes", {
            notes: req.user.notes
        });
    } else {
        res.redirect("/login");
    }
});

router.post("/filter-notes", (req, res) => {
    const {
        filter
    } = req.body;

    if (filter.length === 0) {
        res.send(req.user.notes);
    } else {
        res.send(req.user.notes.filter(note => note.title.startsWith(filter)));
    }
});

router.post("/add-note", (req, res) => {
    const { username, title, content} = req.body;
    axios.get("https://animechan.vercel.app/api/random")
        .then(response => response.data.quote)
        .then(quote => {
            User.findOne({ username: username })
                .then(user => user.notes.concat(
                    [{
                        title: title,
                        content: content,
                        quote: quote
                    }]
                ))
                .then(newNotes => {
                    User.updateOne({
                        username: username
                    }, {
                        notes: newNotes
                    }).then(() => {
                        res.send("Updated.");
                    });
                });
        });
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;