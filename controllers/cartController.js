const fs = require("fs");
const crypto = require("crypto");
const Cart = require("../models/Cart");
const catchAsync = require("../utils/catchAsync");


exports.addShoppingCart = catchAsync(async (req, res) => {

    let product = req.body;
    let user = req.user;

    const foundShopping = await Cart.findOne({userName : user.userName, status: 'PENDING'});

    // console.log(foundShopping,user);

    if(foundShopping)
    {
      console.log('entro aqui carrito existente');
     
        const createCart = await Cart.updateOne({userName: user.userName, status: 'PENDING'},{$push:{products: product}});
        res.status(200).json({
          status: "success",
          data: {
            cart: createCart,
          },
        });
    }
    else
    {
      
      console.log('entro aqui nuevo carrito');
      const createCart = await Cart.create({user:user.userName, status:"PENDING", products:product});
      res.status(200).json({
        status: "success",
        data: {
          cart: createCart,
        },
      });
    }
  });

  exports.deleteShoppingCart = catchAsync(async (req, res) => {

    const { id } = req.params;
    let user = req.user;

    const foundShopping = await Cart.findOne({userName : user.userName, status: 'PENDING'});
    if(foundShopping)
    {

      const {products} = foundShopping;
      const productFound = products.find(prod => prod.id == id);
      if(productFound)
      {
          const deleteCart = await Cart.updateOne({userName: user.userName, status: 'PENDING'},{$pull:{products: productFound}});
          res.status(200).json({
            status: "success",
            data: {
              cart: deleteCart,
            },
          });
      }else{
          res.status(200).json({
            message: 'Error al eliminar, no se encuentra ese producto.',
            status: "succes"
          });  
      }
    }
    else
    {
      res.status(200).json({
        message: 'No existe un carrito de compra.',
        status: "succes"
      });
    }

  });


  exports.payShoppingCart = catchAsync(async (req, res) => {
      let user = req.user;
      const foundShopping = await Cart.findOne({userName : user.userName, status: 'PENDING'});

      if(foundShopping)
      {
        const {products} = foundShopping;
        if(products.length > 0)
        {
          const updateCart = await Cart.updateOne({userName: user.userName, status: 'PENDING'},{status: "PAID"});
          res.status(200).json({
            status: "success",
            data: {
              cart: updateCart,
            },
          });
        }
        else if (products.length == 0)
        {
          res.status(200).json({
            message: 'Error al pagar, debe tener al menos un producto.',
            status: "succes"
          });
        }
      }
      else
      {
        res.status(200).json({
          message: 'No existe un carrito de compra.',
          status: "succes"
        });
      }
  });