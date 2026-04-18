import { Router } from "express";
import { create, list, listAll } from "./decision.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post("/create", authenticate, create);
router.get('/list', authenticate, list)
router.get('/listAll', authenticate, listAll)
export default router;
