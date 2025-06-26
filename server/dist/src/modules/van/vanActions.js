"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vanRepository_1 = __importDefault(require("./vanRepository"));
const browse = async (req, res, next) => {
    try {
        const van = await vanRepository_1.default.readAll();
        res.json(van);
    }
    catch (err) {
        next(err);
    }
};
const browseBYCompany = async (req, res, next) => {
    try {
        const companyId = Number(req.params.id);
        const van = await vanRepository_1.default.readAllByCompany(companyId);
        res.json(van);
    }
    catch (err) {
        next(err);
    }
};
const read = async (req, res, next) => {
    try {
        const vanId = Number(req.params.id);
        const van = await vanRepository_1.default.read(vanId);
        if (van == null) {
            res.sendStatus(404);
        }
        else {
            res.json(van);
        }
    }
    catch (err) {
        next(err);
    }
};
const edit = async (req, res, next) => {
    try {
        const van = {
            id: Number(req.params.id),
            name: req.body.name,
            number_plate: req.body.number_plate,
            picture: req.body.picture,
            fuel: req.body.fuel,
            lbs: req.body.lbs,
            brand: req.body.brand,
            company_id: req.body.company_id,
        };
        const affectedRows = await vanRepository_1.default.update(van);
        if (affectedRows === 0) {
            res.sendStatus(404);
        }
        else {
            res.sendStatus(204);
        }
    }
    catch (err) {
        next(err);
    }
};
const add = async (req, res, next) => {
    try {
        const newVan = {
            name: req.body.name,
            number_plate: req.body.number_plate,
            picture: req.body.picture,
            fuel: req.body.fuel,
            lbs: req.body.lbs,
            brand: req.body.brand,
            company_id: req.body.company_id,
        };
        const insertId = await vanRepository_1.default.create(newVan);
        res.status(201).json({ insertId });
    }
    catch (err) {
        next(err);
    }
};
const destroy = async (req, res, next) => {
    try {
        const vanId = Number(req.params.id);
        await vanRepository_1.default.delete(vanId);
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
};
exports.default = { browse, browseBYCompany, read, edit, add, destroy };
