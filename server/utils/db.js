import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    if (connect) {
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDb;
