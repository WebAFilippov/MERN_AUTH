import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "https://avatars.mds.yandex.net/i?id=66cb59b160608b3ca1198d965073955c6fc1da37-12153883-images-thumbs&n=13"
  }
}, { timestamps: true })

export const User = mongoose.model("User", userSchema)