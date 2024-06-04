module.exports = (express, app) => {
    const cartItemController = require("../controllers/cartItem.controller.js");
    const router = express.Router();


    router.post('/cartItem', cartItemController.addProductToCart);
    router.get('/cartItem/:id', cartItemController.getcartItemById);
    router.delete('/cartItem/:id', cartItemController.removeProductFromCart);
    router.put('/cartItem/:id', cartItemController.updateProductQuantityInCart);

    app.use("/api/cartItem", router);

};