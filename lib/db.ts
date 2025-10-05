import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log(`successfully connect mongodb`);
  } catch (error) {
    console.log(`Error: $(error.meesage)`);
  }
};

export default connectDB;
