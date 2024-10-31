const User = require("../models/user.model");

const getUsersForSidebar = async (req, res) => {
  const loggedInUserId = req.user._id;
  try {
    const filterUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filterUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getUsersForSidebar };
