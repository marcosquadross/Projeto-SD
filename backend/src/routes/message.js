import { Router } from 'express'

import messageController from '../controllers/messageController.js'

const router = Router()

router.post("/message", messageController.create)
router.get("/messages", messageController.getAll)
router.get("/message/:id", messageController.getById)
router.get("/message/author/:id", messageController.getByAuthor)
router.get("/message/receiver/:id", messageController.getByReceiver)
router.put("/message/:id", messageController.update)
router.delete("/message/:id", messageController.delete)  

export { router }