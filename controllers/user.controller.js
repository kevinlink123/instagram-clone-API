const db = require("../models");
const Image = db.image;
const User = db.user;


exports.allAccess = (req, res) => {
    res.status(200).send("Welcome to our homepage (Public content).");
};

exports.mainPage = (req, res) => {

    res.status(200).send("Main Page with images.");
};