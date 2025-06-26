"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const favoriteVanRepository_1 = __importDefault(require("./favoriteVanRepository"));
const browse = async (req, res, next) => {
    try {
        const favoriteVan = await favoriteVanRepository_1.default.readAll();
        res.json(favoriteVan);
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
        const favoriteVans = await favoriteVanRepository_1.default.readVanByRoadieId(roadieId);
        if (!favoriteVans || favoriteVans.length === 0) {
            res.status(404).json({ error: "No favorite vans found" });
            return;
        }
        res.status(200).json(favoriteVans);
    }
    catch (err) {
        next(err);
    }
};
const addFavoriteVan = async (req, res, next) => {
    try {
        const roadies_id = req.roadie.id; // ID du roadie connecté
        const { van_id } = req.body;
        if (!van_id) {
            res.status(400).json({ error: "van_id est requis" });
            return;
        }
        const existingFavorite = await favoriteVanRepository_1.default.readByRoadieAndVanId(roadies_id, van_id);
        if (existingFavorite) {
            res.status(400).json({ error: "Ce van est déjà dans vos favoris." });
            return;
        }
        const newFavoriteVan = { roadies_id, van_id };
        const insertId = await favoriteVanRepository_1.default.create(newFavoriteVan);
        res.status(201).json({ insertId });
    }
    catch (err) {
        next(err);
    }
};
const destroyFavoriteVan = async (req, res, next) => {
    try {
        const roadieId = req.roadie.id;
        const favoriteVanId = Number(req.params.id);
        if (!roadieId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        if (Number.isNaN(favoriteVanId)) {
            res.status(400).json({ error: "Invalid favorite van ID" });
            return;
        }
        const affectedRows = await favoriteVanRepository_1.default.deleteByRoadieAndVanId(roadieId, favoriteVanId);
        if (affectedRows === 0) {
            res.status(404).json({ error: "Favorite van not found" });
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
    addFavoriteVan,
    destroyFavoriteVan,
};
