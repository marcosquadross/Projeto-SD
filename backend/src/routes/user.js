import { Router } from 'express'

import userController from '../controllers/userController.js'

const router = Router()

router.post("/user", userController.create)
router.get("/users", userController.getAll)
router.get("/user/:id", userController.getById)
router.put("/user/:id", userController.update)
router.delete("/user/:id", userController.delete)
router.post("/user/login", userController.login)

export { router }