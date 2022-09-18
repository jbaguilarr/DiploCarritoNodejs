const express = require("express");
const cartController = require("./../controllers/cartController");
const authController = require("./../controllers/authController");
const cartRouter = express.Router();
//routes
cartRouter
  .route("/product/")
  .all(authController.protect)
  .post(cartController.addShoppingCart);

cartRouter
  .route('/product/:id')
  .all(authController.protect)
  .delete(cartController.deleteShoppingCart);

cartRouter
  .route('/pay')
  .all(authController.protect)
  .post(cartController.payShoppingCart);


module.exports = cartRouter;


