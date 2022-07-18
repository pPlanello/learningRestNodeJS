const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRET_PRIVATE_KEY, {
            expiresIn: '2h'
        }, (error, token) => {

            if (error) {
               console.error(error);
               reject('It can not be possible to generate token');
            }

            resolve(token);
        });
    });
}

module.exports = {
    generateJWT
}