import jwt from "jsonwebtoken"

import { errorHandler } from "./error.js"

export const verifyUser = async (req, res, next) => {
  const token = req.cookies.accessToken

  if (!token) return next(errorHandler(403, "Пользователь не авторизован"))

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) next(errorHandler(403, "jwt token invalid"))

    req.user = decoded
    next()
  })
}