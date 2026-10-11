const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const makeToken  = require("../utils/makeToken");
exports.register = async (req, res, next) => {
    try { 
        const {name, email, password, conformpassword} = req.body;
        if(!name) {
            return res.status(404).json({
                message: "name not found"
            })
        }

        if(!email) {
            return res.status(404).json({
                message: "email not found"
            })
        }

        if(!password || !conformpassword) {
            return res.status(404).json({
                message: "Enter password or conform Password"
            })
        }
        if(password != conformpassword) {
            return res.status(404).json({
                message: "Password and conform password must be same"
            })
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name, email, password: hashedpassword
        })

        return res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email
        })
    } catch(err) {
        next(err);
    }
}



exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        if(!email) {
            return res.status(401).json({
                message: "Email not found"
            })
        }
        if(!password) {
            return res.status(401).json({
                message: "Password not found"
            })
        }

        const user = await User.findOne({email}).select("+password");
        if(!user) {
            return res.status(401).json({
                message: "User not found"
            })
        }
        const ok = await bcrypt.compare(password,user.password);
        if(!ok) {
            return res.status(401).json({
                message: "email or password is incorrect"
            })
        }
        res.status(200).json({
            token: makeToken(user)
        })
    } catch(err) {
        next(err);
    }
}