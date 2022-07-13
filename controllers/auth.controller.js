const { response } = require("express");
const bcrypt = require('bcryptjs/dist/bcrypt');

const User = require("../models/user");
const {generateJWT} = require('../utils/generate-jwt');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    
    var token = '';

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
        token = await generateJWT(user.id);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'A problem has occurred, please contact with the administrator.'
        })
    }

    res.json({
        msg: 'Login successfully',
        token
    })
}



module.exports = {
    login
};