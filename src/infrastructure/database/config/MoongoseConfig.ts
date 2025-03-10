import mongoose from "mongoose";

export const mongooseConnection = async () => {
  await mongoose.connect(process.env.DB_URI!);
};
