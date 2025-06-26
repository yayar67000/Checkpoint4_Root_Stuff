"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const reservedVanSchema = joi_1.default.object({
    start_date: joi_1.default.date().required().messages({
        "any.required": "La date de début est obligatoire.",
        "date.base": "La date de début doit être une date valide.",
        "date.empty": "La date de début est obligatoire.",
    }),
    end_date: joi_1.default.date().required().messages({
        "any.required": "La date de fin est obligatoire.",
        "date.base": "La date de fin doit être une date valide.",
        "date.empty": "La date de fin est obligatoire.",
    }),
});
const validate = (req, res, next) => {
    const { error } = reservedVanSchema.validate(req.body);
    const { start_date, end_date } = req.body;
    if (error && !start_date && !end_date) {
        res.status(400).json({ error: error.details[0].message });
    }
    else {
        next();
    }
};
exports.default = { validate };
