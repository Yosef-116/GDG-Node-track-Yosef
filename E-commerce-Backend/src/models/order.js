import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true,
        }
    }],
    total: {
        type: Number,
        required: true
    },
    customerInfo: {
        email: {
            type: String,
            required: true,
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.model('Order', orderSchema)

export default Order