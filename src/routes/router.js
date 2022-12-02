import { Router } from "express";
import choiceRoute from "./choiceRoutes.js";
import pollRoute from "./pollRoutes.js";

const router = Router();

router.use(choiceRoute);
router.use(pollRoute);

export default router;
