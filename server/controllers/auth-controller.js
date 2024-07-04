const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const home = async (req, res) => {
  try {
    res.status(200).send("Hello World");
  } catch (err) {
    console.log(err);
  }
};

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, phone, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "Email Already Exists" });
    }

    const userCreated = await User.create({
      name,
      email,
      phone,
      password,
    });

    await userCreated.save();

    res.status(201).json({
      msg: "Registration Successfull",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid  Credentials" });
    }
    
    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        msg: "Login Successfull",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    }else{
        res.status(401).json({message: "INVALID EMAIL OR PASSWORD"})
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

module.exports = { home, register, login };

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njg1OGQ5NGI5OWQ3MDUxMzBiZjg2ZmYiLCJlbWFpbCI6InJhaWFzbWl0MTBAZ21haWwuY29tIiwiaWF0IjoxNzIwMTEyOTEzLCJleHAiOjE3MjI3MDQ5MTN9.11IpUIU2rs3RqvJlvXlkjKysiq2MrpvGTtPJ7YGKItM