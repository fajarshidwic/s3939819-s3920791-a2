const db = require("../database");

exports.addProductToCart = async (req, res) => {
    const { cartId, productId, quantity } = req.body;
    try {
      const cartItem = await db.cartItem.create({ cartId, productId, quantity });
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.removeProductFromCart = async (req, res) => {
    const { id } = req.params;
    try {
      const cartItem = await db.cartItem.findOne({ where: { id } });
      if (cartItem) {
        await cartItem.destroy();
        res.status(200).json({ message: 'Product removed from cart' });
      } else {
        res.status(404).json({ message: 'cartItem not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.updateProductQuantityInCart = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
      const cartItem = await db.cartItem.findOne({ where: { id } });
      if (cartItem) {
        cartItem.quantity = quantity;
        await cartItem.save();
        res.status(200).json(cartItem);
      } else {
        res.status(404).json({ message: 'cartItem not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };