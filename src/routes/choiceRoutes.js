import { Router } from "express";

const choiceRoute = Router();

choiceRoute.post("/choice");
choiceRoute.post("/choice/:id/vote");

export default choiceRoute;