
const {Schema, model} = require('mongoose');

const roleSchema = Schema({
    role: {type: String, required: [true, 'The role is mandatori'], unique: true}
});

module.exports = model('Roles', roleSchema);