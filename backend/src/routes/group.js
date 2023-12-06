import { Router } from "express";
import groupController from "../controllers/groupController.js";

const router = Router();

router.post("/group", groupController.create);
router.get("/groups", groupController.getAll);
router.get("/group/:id", groupController.getById);
router.get("/group/user/:id", groupController.getByMember);
router.put("/group/:id", groupController.update);
router.delete("/group/:id", groupController.delete);

export { router };