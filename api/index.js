import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 8000;
const MONGO_DB = process.env.MONGO_DB;

const app = express()


mongoose.connection.on('error', err => {
  console.log("Error MongoDB " + err);
});

mongoose.connection.once("open", () => {
  app.listen(PORT, () => console.log(`Server started on ${PORT}`));
});

mongoose.connect(MONGO_DB)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log('Error connection MongoDB: ' + err));
