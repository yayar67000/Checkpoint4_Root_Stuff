"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const roadiesRepository_1 = __importDefault(require("./roadiesRepository"));
const roadiesRepository_2 = __importDefault(require("./roadiesRepository"));
const browse = async (req, res, next) => {
    try {
        const user = await roadiesRepository_1.default.readAll();
        res.json(user);
    }
    catch (err) {
        next(err);
    }
};
const read = async (req, res, next) => {
    try {
        const roadieId = req.roadie.id;
        const roadie = await roadiesRepository_1.default.read(roadieId);
        if (roadie == null) {
            res.sendStatus(404);
        }
        else {
            res.json(roadie);
        }
    }
    catch (err) {
        next(err);
    }
};
const readGeneralDetails = async (req, res, next) => {
    try {
        const roadieId = Number(req.params.id);
        const roadie = await roadiesRepository_2.default.readGeneralDetails(roadieId);
        if (roadie == null) {
            res.sendStatus(404);
        }
        else {
            res.json(roadie);
        }
    }
    catch (err) {
        next(err);
    }
};
const edit = async (req, res, next) => {
    try {
        const editRoadie = {
            id: req.roadie.id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
        };
        const affectedRows = await roadiesRepository_1.default.update(editRoadie);
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
        const newUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            hashed_password: req.body.hashed_password,
        };
        const insertId = await roadiesRepository_1.default.create(newUser);
        res.status(201).json({ insertId });
    }
    catch (err) {
        if (typeof err === "object" && err !== null && "code" in err) {
            const error = err;
            if (error.code === "ER_DUP_ENTRY") {
                void res.status(400).json({ error: "Cet email est déjà utilisé." });
                return;
            }
        }
        next(err);
    }
};
const destroy = async (req, res, next) => {
    try {
        const roadiesId = req.roadie.id;
        await roadiesRepository_2.default.delete(roadiesId);
        res.sendStatus(204).send({ message: "Compte supprimé avec succès" });
    }
    catch (err) {
        next(err);
    }
};
exports.default = { browse, read, readGeneralDetails, add, destroy, edit };
