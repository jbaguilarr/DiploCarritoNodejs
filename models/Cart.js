const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  products : {
     type : [],
     require : true
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
