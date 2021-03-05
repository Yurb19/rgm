const jwt = require("jsonwebtoken");
const config = require("../config/index");
const User = require("../models/User.model");

const Util = require("../utils/lib.class");

module.exports = class AuthControllers extends Util{
  signIn = async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username: username });

      if (!user) return next(this.errorMessage("username", "Username not found"));

      const hash = user.password;
      const passwordMatch = await User.checkPassword(password, hash);

      if (!passwordMatch)
        return next(this.errorMessage("password", "Wrong Password"));

      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        config.secretOrKey,
        { expiresIn: "7d" }
      );
      res.status("200").json({
        token: `Bearer ${token}`,
      });
    } catch (error) {
      next(error.errors);
    }
  };

  signUp = async (req, res, next) => {
    try {
      const userData = req.body;
      const userExist = await User.findOne({ username: userData.username });

      if (userExist)
        return next(this.errorMessage("username", "Username is already taken"));

      const newUser = new User({
        ...userData,
      });

      newUser.password = await User.encryptPassword(newUser.password);
      // console.log(newUser.password)

      await newUser.save();

      res.status("201").json({
        message: "User created",
        data: newUser._id,
      });
    } catch (error) {
      next(error.errors);
    }
  };
};
