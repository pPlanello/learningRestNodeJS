const {Schema, model} = require('mongoose');

const productSchema = Schema({
    name: {type: String, unique: true, required: [true, 'The name is mandatori']},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    price: {type: Number, default: 0},
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    description: {type: String},
    available: {type: Boolean, default: true}
});

productSchema.methods.toJSON = function() {
    const {__v, ...product} = this.toObject();
    return product;
}

module.exports = model('Product', productSchema);