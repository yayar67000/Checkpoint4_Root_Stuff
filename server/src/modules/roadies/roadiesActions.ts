import type { RequestHandler } from "express";
import userRepository from "./roadiesRepository";
import roadiesRepository from "./roadiesRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const user = await userRepository.readAll();

    res.json(user);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const roadieId = req.roadie.id;
    const roadie = await userRepository.read(roadieId);

    if (roadie == null) {
      res.sendStatus(404);
    } else {
      res.json(roadie);
    }
  } catch (err) {
    next(err);
  }
};

const readGeneralDetails: RequestHandler = async (req, res, next) => {
  try {
    const roadieId = Number(req.params.id);
    const roadie = await roadiesRepository.readGeneralDetails(roadieId);

    if (roadie == null) {
      res.sendStatus(404);
    } else {
      res.json(roadie);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const editRoadie = {
      id: req.roadie.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    };

    const affectedRows = await userRepository.update(editRoadie);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      hashed_password: req.body.hashed_password,
    };

    const insertId = await userRepository.create(newUser);

    res.status(201).json({ insertId });
  } catch (err) {
    if (typeof err === "object" && err !== null && "code" in err) {
      const error = err as { code: string };

      if (error.code === "ER_DUP_ENTRY") {
        void res.status(400).json({ error: "Cet email est déjà utilisé." });
        return;
      }
    }
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const roadiesId = req.roadie.id;

    await roadiesRepository.delete(roadiesId);

    res.sendStatus(204).send({ message: "Compte supprimé avec succès" });
  } catch (err) {
    next(err);
  }
};

export default { browse, read, readGeneralDetails, add, destroy, edit };
