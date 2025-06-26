"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const roadiesRepository_1 = __importDefault(require("../modules/roadies/roadiesRepository"));
const login = async (req, res, next) => {
    try {
        const roadie = await roadiesRepository_1.default.readByEmailWithPassword(req.body.email, req.body.firstname);
        if (roadie) {
            req.user = {
                password: roadie.hashed_password,
                id: roadie.id,
                email: roadie.email,
                role: "roadie",
                firstname: roadie.firstname,
            };
        }
        if (!req.user) {
            res.sendStatus(403);
        }
        const verified = await argon2_1.default.verify(req.user.password, req.body.password);
        console.info(roadie.firstname);
        if (!verified) {
            res.sendStatus(422);
        }
        else {
            const payload = {
                id: req.user.id,
                email: req.user.email,
                role: req.user.role,
                firstname: req.user.firstname,
            };
            if (!process.env.APP_SECRET) {
                throw new Error("Vous n'avez pas configuré votre APP SECRET dans le .env");
            }
            const token = await jsonwebtoken_1.default.sign(payload, process.env.APP_SECRET, {
                expiresIn: "10m",
            });
            res.cookie("auth", token).send({
                maxAge: 10 * 60 * 1000,
                message: "Utilisateur connecté",
                role: req.user.role,
                name: req.user.firstname,
            });
        }
    }
    catch (error) {
        next(error);
    }
};
const logout = async (req, res, next) => {
    try {
        res.clearCookie("auth").send("Cookies supprimés");
    }
    catch (error) {
        next(error);
    }
};
const hashingOptions = {
    type: argon2_1.default.argon2id,
    memoryCost: 19 * 2 ** 10,
    timeCost: 2,
    parallelism: 1,
};
const hashPassword = async (req, res, next) => {
    try {
        const { password } = req.body;
        const hashedPassword = await argon2_1.default.hash(password, hashingOptions);
        req.body.hashed_password = hashedPassword;
        req.body.password = undefined;
        next();
    }
    catch (err) {
        next(err);
    }
};
const verify = async (req, res, next) => {
    if (!process.env.APP_SECRET) {
        throw new Error("Vous n'avez pas configuré votre APP SECRET dans le .env");
    }
    try {
        const { auth } = req.cookies;
        if (!auth) {
            res.sendStatus(403);
        }
        const resultPayload = await jsonwebtoken_1.default.verify(auth, process.env.APP_SECRET);
        if (typeof resultPayload !== "object") {
            throw new Error("Token invalid");
        }
        if (resultPayload.role === "roadie") {
            req.roadie = { id: resultPayload.id };
        }
        res.cookie("auth", auth, {
            maxAge: 10 * 60 * 1000,
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = { login, logout, hashPassword, verify };
