import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

import { User } from './../models/user.model.js';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) return next(errorHandler(400, "Поля обязательны к заполнению"))

  try {
    const duplicateUsername = await User.findOne({ username })
    const duplicateEmail = await User.findOne({ email })
    if (duplicateUsername || duplicateEmail) return next(errorHandler(409, "Такой пользователь уже существует"))

    const hashedPassword = await bcryptjs.hash(password, 10)
    const newUser = await User.create({ username, email, password: hashedPassword })

    const { password: hashPassword, ...rest } = newUser._doc

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
    res.cookie("accessToken", token, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true
    })
    res.status(201).json(rest)
  } catch (error) {
    next(error)
  }
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) return next(errorHandler(400, "Поля обязательны к заполнению"))

  try {
    const validUser = await User.findOne({ email })
    if (!validUser) return next(errorHandler(404, "Такой пользователь не найден"))

    const validPassword = await bcryptjs.compare(password, validUser.password)
    if (!validPassword) return next(errorHandler(403, "Неверные данные"))

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)

    const { password: hashedPassword, ...user } = validUser._doc

    res.cookie('accessToken', token, { expires: new Date(Date.now() + 900000), httpOnly: true });
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

export const google = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body

    const user = await User.findOne({ email })

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      const { password: hashedPassword, ...rest } = user._doc
      res.cookie("accessToken", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true
      })
      res.status(200).json(rest)
    } else {
      const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
      const hashedPassword = await bcryptjs.hash(generatePassword, 10)
      const generateUsername = name.split(" ").join("") + Math.random().toString(36).slice(-8)
      const newUser = await User.create({
        username: generateUsername,
        email,
        password: hashedPassword,
        profilePicture: photo
      })
      const { password: hashedPassword2, ...rest } = newUser._doc
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
      res.cookie("accessToken", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true
      })
      res.status(201).json(rest)
    }
  } catch (error) {
    next(error)
  }
}