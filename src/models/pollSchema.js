import baseJoi from "joi";
import dateExtension from "@joi/date";
const joi = baseJoi.extend(dateExtension);

export const pollSchema = joi.object({
  title: joi.string().required().min(1),
  expireAt: joi.date().format("YYYY-MM-DD HH:mm"),
});
