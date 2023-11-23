import { Router } from "express"
import { router as userRouter } from "./user.js"
import { router as messageRouter } from "./message.js"

const router = Router()

router.use("/", userRouter)

router.use("/", messageRouter)


export { router }

