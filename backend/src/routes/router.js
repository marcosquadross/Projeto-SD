import { Router } from "express"
import { router as userRouter } from "./user.js"
import { router as emailRouter } from "./email.js"

const router = Router()

router.use("/", userRouter)

router.use("/", emailRouter)


export { router }

