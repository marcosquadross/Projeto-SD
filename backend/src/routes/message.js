import { Router } from 'express'

import MessageController from '../controllers/MessageController.js'

const router = Router()

router.post("/message", MessageController.createMessage)
router.get("/messages", MessageController.findAllMessages)
router.get("/message/:id", MessageController.findMessage)
router.put("/message/:id", MessageController.updateMessage)
router.delete("/message/:id", MessageController.deleteMessage)  

export { router }