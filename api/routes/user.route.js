import express from "express"

import { verifyUser } from "../utils/verifyUser.js"
import { update } from "../controllers/user.controller.js"

const router = express.Router()

router.post('/update/:id', verifyUser, update)

export default router