import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import path from "path"
dotenv.config()

import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"

const PORT = process.env.PORT || 8000
const MONGO_DB = process.env.MONGO_DB

const __dirname = path.resolve()

const app = express()

app.use(express.static(path.join(__dirname, "client", "dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

app.use(express.json())
app.use(cookieParser())

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Ошибка сервера"
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode
  })
})

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

mongoose.connection.on('error', err => {
  console.log("Error MongoDB " + err);
});

mongoose.connection.once("open", () => {
  app.listen(PORT, () => console.log(`Server started on ${PORT}`));
});

mongoose.connect(MONGO_DB)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log('Error connection MongoDB: ' + err));



