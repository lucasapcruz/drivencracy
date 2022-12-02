import { choiceSchema } from "../models/choiceSchema.js";

export async function choiceSchemaValidation(req, res, next) {
  const choice = req.body;

  const { error } = choiceSchema.validate(choice, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  next();
}
