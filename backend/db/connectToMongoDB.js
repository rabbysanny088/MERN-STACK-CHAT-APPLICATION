require("dotenv").config();
const { mongoose } = require("mongoose");

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDb connected");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

module.exports = connectToMongoDb;
