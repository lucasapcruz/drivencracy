import { Router } from "express";
import { createPoll } from "../controllers/polls.controller.js";
import { pollSchemaValidation } from "../middlewares/pollSchemaValidation.js";

const pollRoute = Router();

pollRoute.post("/poll", pollSchemaValidation, createPoll);
pollRoute.get("/poll");
// pollRoute.get("/poll/:id/choice");
// pollRoute.get("/poll/:id/result");

export default pollRoute;