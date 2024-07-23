import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongoose.js";

const app = express();
dotenv.config();
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log("SERVER IS LISTENING TO PORT: ", process.env.PORT);
});
connectDB();
