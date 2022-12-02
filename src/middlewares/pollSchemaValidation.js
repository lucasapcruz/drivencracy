import { pollSchema } from "../models/pollSchema.js";

export async function pollSchemaValidation(req, res, next) {
  const poll = req.body;

  const { error } = pollSchema.validate(poll, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  next();
}
