import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUri = process.env.MONGO_URI;
const dbConnection = async (req, res) => {
  try {
    await mongoose.connect(mongoUri);
    console.log("DB Connected");
  } catch (error) {
    console.log(`Error while connecting DB: ${error}`);
    process.exit(1);
  }
};

export default dbConnection;
