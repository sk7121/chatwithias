const User = require("../models/User");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } }).select(
      "username email avatar isOnline",
    );

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
