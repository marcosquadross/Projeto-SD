import { Router } from "express"
import { userController } from "../controllers/userController.js"


const router = Router()

router.route("/user").post((req, res) => userController.create(req, res))
router.route("/users").get((req, res) => userController.getAll(req, res))
router.route("/user/:id").get((req, res) => userController.getById(req, res))
router.route("/user/:id").delete((req, res) => userController.delete(req, res))
router.route("/user/:id").put((req, res) => userController.update(req, res))
router.route("/user/login").post((req, res) => userController.login(req, res))

export { router }