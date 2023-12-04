import { Router } from 'express'

import MessageController from '../controllers/MessageController.js'

const router = Router()

router.post("/message", MessageController.create)
router.get("/message/:id", MessageController.getById)
router.get("/messages/author/:id", MessageController.getByAuthor)
router.get("/messages/reciver/:id", MessageController.getByReceiver)
router.put("/message/:id", MessageController.update)
router.delete("/message/:id", MessageController.delete)  

export { router }