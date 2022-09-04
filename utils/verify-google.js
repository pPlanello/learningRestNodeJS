const { OAuth2Client } = require('google-auth-library');
const { verify } = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


async function verifyGoogle(token = '') {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    const userId = payload['sub'];

    // console.log('Google data login: ', payload);

    const {name, picture, email} = payload;

    return {name, image: picture, email};

}

module.exports = {
    verifyGoogle
}