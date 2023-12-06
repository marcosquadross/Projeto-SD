import { Router } from 'express'

import { router as userRouter } from "./user.js"
import { router as messageRouter } from "./message.js"
import { router as groupRouter } from "./group.js"

const router = Router()

router.use("/", userRouter)

router.use("/", messageRouter)

router.use("/", groupRouter)

export { router }