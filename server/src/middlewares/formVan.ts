import type { RequestHandler } from "express";

import Joi from "joi";

const offerSchema = Joi.object({
  id: Joi.any().optional(),
  name: Joi.string().max(255).required().messages({
    "string.max": "Le nom ne peut pas dépasser 255 caractères.",
    "string.empty": "Le nom est obligatoire.",
    "any.required": "Le nom est obligatoire.",
  }),
  number_plate: Joi.string().max(255).required().messages({
    "string.max": "L'immatriculation ne peut pas dépasser 255 caractères.",
    "string.empty": "L'immatriculation est obligatoire.",
    "any.required": "L'immatriculation est obligatoire.",
  }),
  picture: Joi.string().required().messages({
    "string.empty": "L'image' est obligatoire.",
    "any.required": "L'image' est obligatoire.",
  }),
  fuel: Joi.string().required().messages({
    "string.empty": "La précision du carburant est obligatoire.",
    "any.required": "La précision du carburant est obligatoire.",
  }),
  lbs: Joi.string().required().messages({
    "string.empty": "Le poids est obligatoire.",
    "any.required": "Le poids est obligatoire.",
  }),
  brand: Joi.string().required().messages({
    "string.empty": "La marque recherché est obligatoire.",
    "any.required": "La marque recherché est obligatoire.",
  }),

  company_id: Joi.number().integer().positive().required().messages({
    "number.positive":
      "Le champ concernant le télétravail doit être séléctionné.",
    "number.base": "Le champ concernant le télétravail doit être séléctionné.",
    "any.required": "Le champ concernant le télétravail doit être séléctionné.",
  }),
});

const validate: RequestHandler = (req, res, next) => {
  const { error } = offerSchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

export default { validate };
