"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reservedVanRepository_1 = __importDefault(require("./reservedVanRepository"));
const browse = async (req, res, next) => {
    try {
        const reservedVan = await reservedVanRepository_1.default.readAll();
        res.json(reservedVan);
    }
    catch (err) {
        next(err);
    }
};
const readByRoadie = async (req, res, next) => {
    try {
        const roadieId = req.roadie.id;
        if (!roadieId) {
            res.status(401).json({ error: "Unauthorized: Roadie ID is missing" });
            return;
        }
        const reservedVans = await reservedVanRepository_1.default.readReservedVanByRoadieId(roadieId);
        if (!reservedVans || reservedVans.length === 0) {
            res.status(404).json({ error: "No reserved vans found" });
            return;
        }
        res.status(200).json(reservedVans);
    }
    catch (err) {
        next(err);
    }
};
const edit = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const editReservedVan = {
            id,
            roadies_id: req.body.roadie_id,
            van_id: req.body.van_id,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            updated_at: req.body.updated_at,
        };
        const affectedRows = await reservedVanRepository_1.default.update(editReservedVan);
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
const addReservedVan = async (req, res, next) => {
    try {
        const roadies_id = req.roadie.id;
        const { van_id, start_date, end_date, updated_at } = req.body;
        if (!van_id) {
            res.status(400).json({ error: "van_id est requis" });
            return;
        }
        const existingReservedVan = await reservedVanRepository_1.default.readByRoadieAndVanId(roadies_id, van_id);
        if (existingReservedVan) {
            res.status(400).json({ error: "Ce van est déjà réservé." });
            return;
        }
        const newReservedVan = {
            roadies_id,
            van_id,
            start_date,
            end_date,
            updated_at,
        };
        const insertId = await reservedVanRepository_1.default.create(newReservedVan);
        res.status(201).json({ insertId });
    }
    catch (err) {
        next(err);
    }
};
const destroyReservedVan = async (req, res, next) => {
    try {
        const roadieId = req.roadie.id;
        const reservedVanId = Number(req.params.id);
        if (!roadieId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        if (Number.isNaN(reservedVanId)) {
            res.status(400).json({ error: "Invalid reserved van ID" });
            return;
        }
        const affectedRows = await reservedVanRepository_1.default.deleteByRoadieAndVanId(roadieId, reservedVanId);
        if (affectedRows === 0) {
            res.status(404).json({ error: "Reserved van not found" });
            return;
        }
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
};
exports.default = {
    browse,
    readByRoadie,
    edit,
    addReservedVan,
    destroyReservedVan,
};
