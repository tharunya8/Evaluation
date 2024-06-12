//mongoose import
import mongoose from "mongoose";
import dotenv from "dotenv";

//congigure the URL in env file
dotenv.config();

//Mongo url endpoint to connect
const mongoUrl = `${process.env.mongoUrl}`;

//function to connect mongodb with node js
export async function connectToMongodb() {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    console.log("connection Sucessfull!!");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}
