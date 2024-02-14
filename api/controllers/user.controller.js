import bcryptjs from "bcryptjs"

import { errorHandler } from "../utils/error.js"
import { User } from './../models/user.model.js';

export const updateUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) return next(errorHandler(401, "Вы можете обновить только свою учетную запись"))

  try {
    if (req.params.password) {
      req.params.password = await bcryptjs.hash(req.params.password, 10)
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.params.password,
          profilePicture: req.body.profilePicture
        }
      },
      {
        returnDocument: "after",
      }
    )

    const { password: enteredPassword, ...rest } = user._doc

    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(errorHandler(401, "Вы можете обновить только свою учетную запись"))
  }

  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json("Аккаунт успешно удален")
  } catch (error) {
    next(error)
  }
}