import mongoose from "mongoose";

export const connectDB = async() => {
  try {
    console.log("connecting to DB...");
    await mongoose.connect(
      "mongodb+srv://itisameerkhan:Ameerkhan2003@ameerkhan.gtdpe.mongodb.net/devTinder"
    );
    console.log("DB connection successfull");
  } catch (e) {
    console.log("ERROR WHILE CONNECTING DB");
    console.log(e);
  }
};
 
