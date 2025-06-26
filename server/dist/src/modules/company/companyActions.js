"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const companyRepository_1 = __importDefault(require("./companyRepository"));
const browse = async (req, res, next) => {
    try {
        const company = await companyRepository_1.default.readAll();
        res.json(company);
    }
    catch (err) {
        next(err);
    }
};
const browseByCountry = async (req, res, next) => {
    try {
        const countryId = Number(req.params.id);
        const company = await companyRepository_1.default.ReadAllByCountry(countryId);
        res.json(company);
    }
    catch (err) {
        next(err);
    }
};
const read = async (req, res, next) => {
    try {
        const companyId = Number(req.params.id);
        const company = await companyRepository_1.default.read(companyId);
        if (company == null) {
            res.sendStatus(404);
        }
        else {
            res.json(company);
        }
    }
    catch (err) {
        next(err);
    }
};
const edit = async (req, res, next) => {
    try {
        const company = {
            id: Number(req.params.id),
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            logo: req.body.logo,
            country_id: req.body.country_id,
        };
        const affectedRows = await companyRepository_1.default.update(company);
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
        const newCompany = {
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            logo: req.body.logo,
            country_id: req.body.country_id,
        };
        const insertId = await companyRepository_1.default.create(newCompany);
        res.status(201).json({ insertId });
    }
    catch (err) {
        next(err);
    }
};
const destroy = async (req, res, next) => {
    try {
        const companyId = Number(req.params.id);
        await companyRepository_1.default.delete(companyId);
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
};
exports.default = { browse, browseByCountry, read, add, edit, destroy };
