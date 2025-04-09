import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("connecting to DB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connection successfull");
  } catch (e) {
    console.log("ERROR WHILE CONNECTING DB");
    console.log(e);
  }
};
