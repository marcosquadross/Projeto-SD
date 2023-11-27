import { Router } from 'express';
import { groupController } from '../controllers/groupController.js';

const router = Router();

router.route('/group').post((req, res) => groupController.create(req, res));
router.route('/groups/user/:id').get((req, res) => groupController.getUserGroups(req, res));
router.route('/group/:id').get((req, res) => groupController.getGroupById(req, res));
router.route('/group/:id').put((req, res) => groupController.update(req, res));
router.route('/group/:id').delete((req, res) => groupController.delete(req, res));
router.route('/group/leave/').put((req, res) => groupController.leaveGroup(req, res));