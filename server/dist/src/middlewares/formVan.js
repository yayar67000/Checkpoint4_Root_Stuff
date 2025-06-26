"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const offerSchema = joi_1.default.object({
    id: joi_1.default.any().optional(),
    name: joi_1.default.string().max(255).required().messages({
        "string.max": "Le nom ne peut pas dépasser 255 caractères.",
        "string.empty": "Le nom est obligatoire.",
        "any.required": "Le nom est obligatoire.",
    }),
    number_plate: joi_1.default.string().max(255).required().messages({
        "string.max": "L'immatriculation ne peut pas dépasser 255 caractères.",
        "string.empty": "L'immatriculation est obligatoire.",
        "any.required": "L'immatriculation est obligatoire.",
    }),
    picture: joi_1.default.string().required().messages({
        "string.empty": "L'image' est obligatoire.",
        "any.required": "L'image' est obligatoire.",
    }),
    fuel: joi_1.default.string().required().messages({
        "string.empty": "La précision du carburant est obligatoire.",
        "any.required": "La précision du carburant est obligatoire.",
    }),
    lbs: joi_1.default.string().required().messages({
        "string.empty": "Le poids est obligatoire.",
        "any.required": "Le poids est obligatoire.",
    }),
    brand: joi_1.default.string().required().messages({
        "string.empty": "La marque recherché est obligatoire.",
        "any.required": "La marque recherché est obligatoire.",
    }),
    company_id: joi_1.default.number().integer().positive().required().messages({
        "number.positive": "Le champ concernant le télétravail doit être séléctionné.",
        "number.base": "Le champ concernant le télétravail doit être séléctionné.",
        "any.required": "Le champ concernant le télétravail doit être séléctionné.",
    }),
});
const validate = (req, res, next) => {
    const { error } = offerSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
    }
    else {
        next();
    }
};
exports.default = { validate };
