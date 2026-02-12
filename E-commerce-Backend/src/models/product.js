import mongoose from 'mongoose';
import validator from 'validator';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
        validate(value) {
            if(value < 0){
                throw new Error('Price must be a positive number')
            }
        }
    },
    stock: {
        type: Number,
        required: true,
        validate(value) {
            if(value < 0){
                throw new Error('Stock must be a positive number')
            }
        }
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    }
},
{ timestamps: true });

const Product = mongoose.model('Product', productSchema)

export default Product