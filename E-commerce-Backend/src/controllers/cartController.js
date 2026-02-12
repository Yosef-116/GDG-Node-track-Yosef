import Product from '../models/product.js';
import Cart from '../models/cart.js';

// Get or create a single cart for simplicity (as per instructions)
const getOrCreateCart = async () => {
    let cart = await Cart.findOne();
    if (!cart) {
        cart = new Cart({ items: [] });
        await cart.save();
    }
    return cart;
};

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne().populate('items.productId');
        res.json(cart || { items: [] });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        
        // Validate product existence and stock
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        if (product.stock < quantity) return res.status(400).json({ message: 'Insufficient stock' });

        let cart = await getOrCreateCart();
        
        const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }
        
        await cart.save();
        res.status(201).json(cart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne();
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);
        if (itemIndex > -1) {
            if (quantity <= 0) {
                cart.items.splice(itemIndex, 1);
            } else {
                // Check stock for update
                const product = await Product.findById(productId);
                if (product.stock < quantity) return res.status(400).json({ message: 'Insufficient stock' });
                cart.items[itemIndex].quantity = quantity;
            }
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Item not in cart' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        let cart = await Cart.findOne();
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.items = cart.items.filter(p => p.productId.toString() !== productId);
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

