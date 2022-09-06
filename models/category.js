
const {Schema, model} = require('mongoose');

const categorySchema = Schema({
    name: {type: String, required: [true, 'The name is mandatori'], unique: true},
    state: {type: Boolean, required: true, default: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

categorySchema.methods.toJSON = function() {
    const {__v, ...category} = this.toObject();
    return category;
}

module.exports = model('Category', categorySchema);