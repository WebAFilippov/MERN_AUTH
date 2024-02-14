import bcryptjs from "bcryptjs"

import { errorHandler } from "../utils/error.js"
import { User } from './../models/user.model.js';

export const update = async (req, res, next) => {
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
        runValidators: true,
      }
    )

    const { password: enteredPassword, ...rest } = user._doc

    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}