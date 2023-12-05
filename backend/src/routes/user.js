import { Router } from 'express'

import UserController from '../controllers/UserController.js'

const router = Router()

router.post("/user", UserController.create)
router.get("/users", UserController.getAll)
router.get("/user/:id", UserController.getById)
router.put("/user/:id", UserController.update)
router.delete("/user/:id", UserController.delete)
router.post("/user/login", UserController.login)

export { router }