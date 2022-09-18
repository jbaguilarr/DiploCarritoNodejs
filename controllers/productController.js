const fs = require("fs");
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res) => {

  const products = await Product.find();

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
});

exports.addProduct = catchAsync(async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

// PUT /api/v1/products/:id
// ProductFindByIdAndUpdate(id,body,{new:true})
exports.updateProduct = async (req, res) =>{
  const {id} = req.params;
  
  const foundProduct = await Product.findByIdAndUpdate(id,req.body,{new : true});
  if (foundProduct) {

    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }

};
// DELETE /api/v1/products/:id
//ProductFindByIdAndDelete(Id)
exports.deleteProduct =async (req,res) => {
  const {id} = req.params;

  const foundProduct =await Product.findByIdAndDelete(id);
  if (foundProduct) {

    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};

exports.getProductById = catchAsync(async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});
