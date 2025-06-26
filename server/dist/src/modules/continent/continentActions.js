"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const continentRepository_1 = __importDefault(require("./continentRepository"));
const browse = async (req, res, next) => {
    try {
        const continent = await continentRepository_1.default.readAll();
        res.json(continent);
    }
    catch (err) {
        next(err);
    }
};
const read = async (req, res, next) => {
    try {
        const continentId = Number(req.params.id);
        const continent = await continentRepository_1.default.read(continentId);
        if (continent == null) {
            res.sendStatus(404);
        }
        else {
            res.json(continent);
        }
    }
    catch (err) {
        next(err);
    }
};
const edit = async (req, res, next) => {
    try {
        const continent = {
            id: Number(req.params.id),
            name: req.body.name,
            picture: req.body.picture,
        };
        const affectedRows = await continentRepository_1.default.update(continent);
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
        const newContinent = {
            name: req.body.name,
            picture: req.body.picture,
        };
        const insertId = await continentRepository_1.default.create(newContinent);
        res.status(201).json({ insertId });
    }
    catch (err) {
        next(err);
    }
};
const destroy = async (req, res, next) => {
    try {
        const continentId = Number(req.params.id);
        await continentRepository_1.default.delete(continentId);
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
};
exports.default = { browse, read, edit, add, destroy };
