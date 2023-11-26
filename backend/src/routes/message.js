import { Router } from "express"
import { messageController } from "../controllers/messageController.js"

const router = Router()

router.route("/message").post((req, res) => messageController.create(req, res))
router.route("/message/:id").get((req, res) => messageController.getById(req, res))
router.route("/message/author/:id").get((req, res) => messageController.getByAuthor(req, res))
router.route("/message/recipient/:id").get((req, res) => messageController.getByRecipient(req, res))
router.route("/message/:id").delete((req, res) => messageController.delete(req, res))

export { router }