const User = require("../models/userModel");


const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length > 0) {
       return res.status(200).json(users);
    } else {
      return res.status(200).send({message: "No users found"})
    }
  } catch (error) {
    res.status(404).json({message: error})
  }
}
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password});

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      e,
    });
  }
};

const registerController = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await newUser.save();

    res.status(201).json({ success: true, newUser });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

module.exports = { loginController, registerController,getUsers };
