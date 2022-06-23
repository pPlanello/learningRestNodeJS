
const {Schema, model} = require('mongoose');

const userSchema = Schema({
    username: {type: String, required: [true, 'The name is mandatori']},
    email: {type: String, required: [true, 'The email is mandatori'], unique: true},
    password: {type: String, required: [true, 'The password is mandatori']},
    image: {type: String},
    role: {type: String, required: true, enum: ['ADMIN_ROLE', 'USER_ROLE']},
    state: {type: Boolean, default: true},
    create_by_google: {type: Boolean, default: false}
});

module.exports = model('User', userSchema);