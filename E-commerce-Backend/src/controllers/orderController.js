import Product from '../models/product.js';
import Order from '../models/order.js';
import Cart from '../models/cart.js';

export const createOrder = async (req, res) => {
    try {
        const { customerInfo } = req.body;
        const cart = await Cart.findOne().populate('items.productId');
        
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        let total = 0;
        const orderItems = [];

        // Validate stock and calculate total
        for (const item of cart.items) {
            const product = item.productId;
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
            }
            
            total += product.price * item.quantity;
            orderItems.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity
            });
        }

        // Create Order
        const order = new Order({
            items: orderItems,
            total,
            customerInfo
        });
        
        const savedOrder = await order.save();
        // Deduct stock
        for (const item of cart.items) {
            await Product.findByIdAndUpdate(item.productId._id, {
                $inc: { stock: -item.quantity }
            });
        }
        // Clear cart
        cart.items = [];
        await cart.save();

        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
