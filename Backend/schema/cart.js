const mongo=require('mongoose')
const {Schema}=mongo

const cartSchema = new Schema({
    user:{ type: String, required: true },
    Items: [{ 
        name: { type: String, required: true },
        price: { type: String, required: true },
        image: { type: String, required: true }
    }]
});

const Cart = mongo.model('Cart', cartSchema);

module.exports = Cart;
