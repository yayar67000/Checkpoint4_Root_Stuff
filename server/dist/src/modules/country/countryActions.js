"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const countryRepository_1 = __importDefault(require("./countryRepository"));
const browse = async (req, res, next) => {
    try {
        const country = await countryRepository_1.default.readAll();
        res.json(country);
    }
    catch (err) {
        next(err);
    }
};
const browseByContinent = async (req, res, next) => {
    try {
        const continentId = Number(req.params.id);
        const countries = await countryRepository_1.default.readCountriesBYContinent(continentId);
        res.json(countries);
    }
    catch (err) {
        next(err);
    }
};
const read = async (req, res, next) => {
    try {
        const countryId = Number(req.params.id);
        const country = await countryRepository_1.default.read(countryId);
        if (country == null) {
            res.sendStatus(404);
        }
        else {
            res.json(country);
        }
    }
    catch (err) {
        next(err);
    }
};
const edit = async (req, res, next) => {
    try {
        const country = {
            id: Number(req.params.id),
            name: req.body.name,
            picture: req.body.picture,
            continent_id: req.body.continent_id,
        };
        const affectedRows = await countryRepository_1.default.update(country);
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
        const newcountry = {
            name: req.body.name,
            picture: req.body.picture,
            continent_id: req.body.continent_id,
        };
        const insertId = await countryRepository_1.default.create(newcountry);
        res.status(201).json({ insertId });
    }
    catch (err) {
        next(err);
    }
};
const destroy = async (req, res, next) => {
    try {
        const countryId = Number(req.params.id);
        await countryRepository_1.default.delete(countryId);
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
};
exports.default = { browse, browseByContinent, read, edit, add, destroy };
