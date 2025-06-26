"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const roadieSchema = joi_1.default.object({
    firstname: joi_1.default.string().max(50).required().messages({
        "string.max": "Le prénom ne peut pas dépasser 50 caractères.",
        "string.empty": "Le prénom est obligatoire.",
        "any.required": "Le prénom est obligatoire.",
    }),
    lastname: joi_1.default.string().max(50).required().messages({
        "string.max": "La nom de famille ne peut pas dépasser 50 caractères.",
        "string.empty": "La nom de famille est obligatoire.",
        "any.required": "La nom de famille est obligatoire.",
    }),
    email: joi_1.default.string().required().messages({
        "string.empty": "L'email est obligatoire.",
        "any.required": "L'email est obligatoire.",
    }),
    password: joi_1.default.string()
        .min(8)
        .max(100)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
        .label("password")
        .required()
        .messages({
        "string.empty": "Le champ ne peut pas être vide",
        "string.min": "Une longueur de 8 caractères est demandée",
        "any.required": "Le mot de passe est obligatoire",
        "string.pattern.base": "Le mot de passe doit contenir des majuscules, minuscules et au moins un caractère spécial",
    }),
    password_confirmation: joi_1.default.any()
        .valid(joi_1.default.ref("password"))
        .required()
        .options({ messages: { any: { allowOnly: "must match password" } } }),
});
const validate = (req, res, next) => {
    const { error } = roadieSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
    }
    else {
        next();
    }
};
const updateRoadieSchema = joi_1.default.object({
    firstname: joi_1.default.string().max(50).required().messages({
        "string.max": "Le prénom ne peut pas dépasser 50 caractères.",
        "string.empty": "Le prénom est obligatoire.",
        "any.required": "Le prénom est obligatoire.",
    }),
    lastname: joi_1.default.string().max(50).required().messages({
        "string.max": "La nom de famille ne peut pas dépasser 50 caractères.",
        "string.empty": "La nom de famille est obligatoire.",
        "any.required": "La nom de famille est obligatoire.",
    }),
    email: joi_1.default.string().required().messages({
        "string.empty": "L'email est obligatoire.",
        "any.required": "L'email est obligatoire.",
    }),
});
const validateUpdate = (req, res, next) => {
    const { error } = updateRoadieSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
};
exports.default = { validate, validateUpdate };
