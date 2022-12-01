import { Router } from "express";
import { createPoll, getPolls } from "../controllers/choices.controller.js";
import { pollSchemaValidation } from "../middlewares/pollSchemaValidation.js";

const pollRoute = Router();

pollRoute.post("/poll", pollSchemaValidation, createPoll);
pollRoute.get("/poll", getPolls);
// pollRoute.get("/poll/:id/choice");
// pollRoute.get("/poll/:id/result");

export default pollRoute;