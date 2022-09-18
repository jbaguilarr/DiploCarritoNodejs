const fs = require("fs");
const crypto = require("crypto");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");



exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: users.length,
    data: {
      users,
    },
  });
});

exports.addUser = catchAsync(async (req, res) => {
  req.body.password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  let newUser = await User.create(req.body);
  newUser = newUser.toObject();
  delete newUser.password;

  res.status(200).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});


exports.updateUser = async (req, res) =>{
  const {id} = req.params;
  
  const foundUser = await User.findByIdAndUpdate(id,req.body,{new : true});
  if (foundUser) {

    res.status(200).json({
      status: "success",
      data: {
        user: foundUser,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }

};

exports.deleteUser =async (req,res) => {
  const {id} = req.params;

  const foundUser =await User.findByIdAndDelete(id);
  if (foundUser) {

    res.status(200).json({
      status: "success",
      data: {
        user : foundUser,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};

exports.getUserById = catchAsync(async (req, res) => {
  const foundUser = await User.findById(req.params.id);
  if (foundUser) {
    res.status(200).json({
      status: "success",
      data: {
        user: foundUser,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});