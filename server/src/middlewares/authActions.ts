import argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import roadiesRepository from "../modules/roadies/roadiesRepository";

const login: RequestHandler = async (req, res, next) => {
  try {
    const roadie = await roadiesRepository.readByEmailWithPassword(
      req.body.email,
      req.body.firstname,
    );

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

    const verified = await argon2.verify(req.user.password, req.body.password);
    console.info(roadie.firstname);
    if (!verified) {
      res.sendStatus(422);
    } else {
      const payload = {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
        firstname: req.user.firstname,
      };

      if (!process.env.APP_SECRET) {
        throw new Error(
          "Vous n'avez pas configuré votre APP SECRET dans le .env",
        );
      }

      const token = await jwt.sign(payload, process.env.APP_SECRET, {
        expiresIn: "1y",
      });
      res.cookie("auth", token).send({
        message: "Utilisateur connecté",
        role: req.user.role,
        name: req.user.firstname,
      });
    }
  } catch (error) {
    next(error);
  }
};

const logout: RequestHandler = async (req, res, next) => {
  try {
    res.clearCookie("auth").send("Cookies supprimés");
  } catch (error) {
    next(error);
  }
};

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;

    const hashedPassword = await argon2.hash(password, hashingOptions);

    req.body.hashed_password = hashedPassword;

    req.body.password = undefined;

    next();
  } catch (err) {
    next(err);
  }
};

const verify: RequestHandler = async (req, res, next) => {
  if (!process.env.APP_SECRET) {
    throw new Error("Vous n'avez pas configuré votre APP SECRET dans le .env");
  }

  try {
    const { auth } = req.cookies;

    if (!auth) {
      res.sendStatus(403);
    }

    const resultPayload = await jwt.verify(auth, process.env.APP_SECRET);

    if (typeof resultPayload !== "object") {
      throw new Error("Token invalid");
    }
    if (resultPayload.role === "roadie") {
      req.roadie = { id: resultPayload.id };
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default { login, logout, hashPassword, verify };
