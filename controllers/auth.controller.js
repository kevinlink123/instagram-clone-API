const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');



exports.signup = async (req, res) => {
    try{
        const user = await User.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8)
        });

        res.status(201).send({ message: "User was registered successfully!" });
    } catch (err) {
        console.log(err);
    }
}

exports.signin = async (req, res) => {
    try{
        console.log("SIGN IN")
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
            
        });

        if(!user) {
            return res.status(404).send({
                message: "User not found"
            });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if(!passwordIsValid) {
            return res.status(403).send({
                message: "Invalid credentials."
            });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 1 dia aprox
        });

        res.status(200).send({
            id: user.id,
            username: user.username,
            accessToken: token
        })
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}

exports.deleteUser = async (req, res, next) => {
    try{
        if(!req.body.username) {
            return res.status(400).send({
                message: "The username cannot be empty"
            });
        }
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if(!user) {
            return res.status(404).send({
                message: "The user you are looking for doesn't exist"
            });
        }

        await user.destroy();
        res.status(200).send({
            message: "User was removed successfully"
        });

    } catch(err) {
        console.log(err);
    }
}