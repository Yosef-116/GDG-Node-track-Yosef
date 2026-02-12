import express from 'express';
import connectDB from './config/db.js'
import dotenv from 'dotenv';
import cors from 'cors';

import productRoutes from './routers/product.js';
import cartRoutes from './routers/cart.js';
import orderRoutes from './routers/order.js';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send('E-commerce API is running...');
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`) 
})