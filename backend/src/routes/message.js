import { Router } from "express"
import { messageController } from "../controllers/messageController.js"

const router = Router()

router.route("/message").post((req, res) => messageController.create(req, res))
router.route("/messages").get((req, res) => messageController.getAll(req, res))
router.route("/message/:id").get((req, res) => messageController.getById(req, res))

export { router }