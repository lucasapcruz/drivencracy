import { Router } from "express";
import { getChoicesInPoll } from "../controllers/choices.controller.js";
import {
  createPoll,
  getPollResult,
  getPolls,
} from "../controllers/polls.controller.js";
import { pollSchemaValidation } from "../middlewares/pollSchemaValidation.js";

const pollRoute = Router();

pollRoute.post("/poll", pollSchemaValidation, createPoll);
pollRoute.get("/poll", getPolls);
pollRoute.get("/poll/:id/choice", getChoicesInPoll);
pollRoute.get("/poll/:id/result", getPollResult);

export default pollRoute;
