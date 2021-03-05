const User = require("../models/User.model");
const Util = require("../utils/lib.class");

module.exports = class UserControllers extends Util {
  getUser = async (req, res, next) => {
    try {
      const id = req.params._id;
      const user = await User.findOne({ _id: id }, {password: 0});

      res.status(200).json({
        data: user,
      });
    } catch (error) {
      next(error.errors);
    }
  };

  getUsers = async (req, res, next) => {
    try {
      const query = req.query;
      const users = await User.find(query, { password: 0 });
      res.status(200).json({
        data: users,
      });
    } catch (error) {
      next(error.errors);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const id = req.params._id;
      const user = await User.findOne({ _id: id });
      const userData = req.body;

      let newPassword = "";

      if (userData.newPassword) {
        const isCorrect = await User.checkPassword(
          userData.currentPassword,
          user.password
        );

        if (!isCorrect)
          return next(
            this.errorMessage("password", "Current password did not match")
          );

        newPassword = await User.encryptPassword(userData.newPassword);
      }

      await User.updateOne(
        { _id: id },
        {
          $set: {
            password: newPassword || user.password,
            name: userData.name || user.name,
          },
        },
        {
          runValidators: true,
        }
      );

      res.status("200").json({
        message: "User Updated",
        data: id,
      });
    } catch (error) {
      next(error.errors);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const id = req.params._id;
      await User.updateOne(
        { _id: id },
        {
          $set: {
            status: false,
          },
        }
      );

      res.status("200").json({
        message: "User deleted",
      });
    } catch (error) {
      next(error.errors);
    }
  };
};
