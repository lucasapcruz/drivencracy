import { Router } from "express";
import {
  defineChoice,
  voteOnChoice,
} from "../controllers/choices.controller.js";
import { choiceSchemaValidation } from "../middlewares/choiceSchemaValidation.js";

const choiceRoute = Router();

choiceRoute.post("/choice", choiceSchemaValidation, defineChoice);
choiceRoute.post("/choice/:id/vote", voteOnChoice);

export default choiceRoute;
