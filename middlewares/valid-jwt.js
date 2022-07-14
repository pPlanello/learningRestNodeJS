const { response, request } = require("express")
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No valid token - Token undefined'
        });
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
        
        const user = await User.findById(payload.uid);

        if (!user) {
            return res.status(401).json({
                msg: 'No valid token - User not exist'
            });
        }

        if (user.status) {
            return res.status(401).json({
                msg: 'No valid token - User is not active'
            });
        }
        
        req.user = user;
        
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            msg: 'No valid token'
        });
    }
}

module.exports = [
    validJWT
]