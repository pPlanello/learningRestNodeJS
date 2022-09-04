const { response, json } = require("express");
const bcrypt = require('bcryptjs/dist/bcrypt');

const User = require("../models/user");
const { generateJWT } = require('../utils/generate-jwt');
const { verifyGoogle } = require("../utils/verify-google");

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        // Verify email
        const user = await User.findOne({email});
        // Verify password
        const validPassword = user ? bcrypt.compareSync(password, user.password) : false;

        if (!user || !validPassword) {
            return res.status(400).json({
                msg: 'Email or password incorrect.'
            });
        }

        // User active
        if (!user.state) {
            return res.status(400).json({
                msg: 'Email is not active.'
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            msg: 'Login successfully',
            token
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'A problem has occurred, please contact with the administrator.'
        })
    }
}


const googleSignIn = async (req, res = response) => {
    const {id_token} = req.body;

    try {
        const {name, image, email} = await verifyGoogle(id_token);

        let user = await User.findOne({email});

        // Create user if not exist
        if (!user) {
            const data = {
                username: name,
                email,
                password: ':P',
                image,
                role: 'USER_ROLE',
                create_by_google: true
            }

            user = new User(data);
            await user.save();
        }

        // Valid user active
        if (!user.state) {
            return res.status(401).json({
                msg: 'User bloqued. Please contact with the Admin.'
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            token,
            user
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({
            msg: 'The token can not be verify'
        });
    }    
}


module.exports = {
    login,
    googleSignIn
};