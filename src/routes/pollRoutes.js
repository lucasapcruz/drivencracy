import { Router } from "express";

const pollRoute = Router();

pollRoute.post("/poll");
pollRoute.get("/poll");
pollRoute.get("/poll/:id/choice");
pollRoute.get("/poll/:id/result");

export default pollRoute;