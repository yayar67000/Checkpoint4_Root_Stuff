import type { RequestHandler } from "express";

import Joi from "joi";

const reservedVanSchema = Joi.object({
  start_date: Joi.date().required().messages({
    "any.required": "La date de début est obligatoire.",
    "date.base": "La date de début doit être une date valide.",
    "date.empty": "La date de début est obligatoire.",
  }),
  end_date: Joi.date().required().messages({
    "any.required": "La date de fin est obligatoire.",
    "date.base": "La date de fin doit être une date valide.",
    "date.empty": "La date de fin est obligatoire.",
  }),
});
const validate: RequestHandler = (req, res, next) => {
  const { error } = reservedVanSchema.validate(req.body);
  const { start_date, end_date } = req.body;

  if (error && !start_date && !end_date) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};
export default { validate };
