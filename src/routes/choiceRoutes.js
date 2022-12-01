import { Router } from "express";
import { defineChoice } from "../controllers/choices.controller";
import { choiceSchemaValidation } from "../middlewares/choiceSchemaValidation";

const choiceRoute = Router();

choiceRoute.post("/choice", choiceSchemaValidation, defineChoice);
// choiceRoute.post("/choice/:id/vote");

export default choiceRoute;