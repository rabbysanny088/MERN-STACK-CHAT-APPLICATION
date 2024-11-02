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

const Profile = async (req, res) => {
  const { id: profileId } = req.params;
  try {
    const user = await User.findOne({ _id: profileId });

    if (!user) {
      res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getUsersForSidebar, Profile };
