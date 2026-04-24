import { Router } from "express";
import { create, list, listAll, update } from "./decision.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post("/create", authenticate, create);
router.get('/list', authenticate, list)
router.get('/listAll', authenticate, listAll)
router.put('/updateOutcome', authenticate, update)
export default router;
