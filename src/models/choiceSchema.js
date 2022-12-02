import joi from "joi";

export const choiceSchema = joi.object({
  title: joi.string().required().min(1),
  pollId: joi.string().required().pattern(new RegExp("^[0-9a-fA-F]{24}$")),
});
