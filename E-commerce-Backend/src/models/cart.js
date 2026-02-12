import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true,
            validate (value) {
                if(value < 1){
                    throw new Error('There is no item in the cart.')
                }
            }
        }
    }]
},
{ timestamps: true });

const Cart = mongoose.model('Cart', cartSchema)

export default Cart