const db = require("../database");

// Function to create a new cart
exports.createCart = async (req, res) => {
  try {
    const userId = req.body.userId;

    // Check if a cart already exists for the user
    let cart = await db.cart.findOne({ where: { userId } });
    if (cart) {
      return res.status(400).json({ error: "A cart already exists for this user" });
    }

    // Create a new cart for the user if none exists
    cart = await db.cart.create({ userId });

    res.status(201).json(cart);
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

// Function to fetch cart items for a specific cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Try to find a cart for the user
    let cart = await db.cart.findOne({
      where: { userId },
      include: {
        model: db.cartItem,
        include: {
          model: db.product
        }
      }
    });

    // If no cart is found, create a new one
    if (!cart) {
      cart = await db.cart.create({ userId });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

// Function to add a product to the cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.body.userId; 
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    // Find or create a cart for the user
    let cart = await db.cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await db.cart.create({ userId });
    }

    // Find or create a cart line for the product in the user's cart
    let cartItem = await db.cartItem.findOne({ where: { cartId: cart.cartId, productId } });
    if (cartItem) {
      // Update the quantity if the product is already in the cart
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Create a new cart line if the product is not in the cart
      cartItem = await db.cartItem.create({ cartId: cart.cartId, productId, quantity });
    }

    res.status(200).json(cartItem);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

// Function to update the quantity of a product in the cart
exports.updateCartItem = async (req, res) => {
  try {
    const { cartItemId, quantity } = req.body;

    // Find the cart line item
    const cartItem = await db.cartItem.findByPk(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // Update the quantity
    cartItem.quantity = quantity;
    await cartItem.save();

    res.json(cartItem);
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};

// Function to remove a product from the cart
exports.removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    // Find the cart line item
    const cartItem = await db.cartItem.findByPk(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // Delete the cart line item
    await cartItem.destroy();

    res.json({ message: 'Cart item removed' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};

// Function to clear the cart
exports.clearCart = async (req, res) => {
  try {
    console.log('Received cartId:', req.params.cartId);
    const cartId = req.params.cartId;

    // Find the cart
    let cart = await db.cart.findOne({ where: { cartId } });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Delete all cart line items
    const result = await db.cartItem.destroy({ where: { cartId: cart.cartId } });
    console.log('Result of deleting cart line items:', result);

    res.json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};
