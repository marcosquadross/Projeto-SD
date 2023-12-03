import { Router } from 'express'

import UserController from '../controllers/UserController.js'

const router = Router()

router.post("/user", UserController.createUser)
router.get("/users", UserController.findAllUsers)
router.get("/user/:id", UserController.findUser)
router.put("/user/:id", UserController.updateUser)
router.delete("/user/:id", UserController.deleteUser)
router.post("/user/login", UserController.login)

export { router }