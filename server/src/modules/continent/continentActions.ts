import type { RequestHandler } from "express";
import continentRepository from "./continentRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const continent = await continentRepository.readAll();
    res.json(continent);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const continentId = Number(req.params.id);
    const continent = await continentRepository.read(continentId);

    if (continent == null) {
      res.sendStatus(404);
    } else {
      res.json(continent);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const continent = {
      id: Number(req.params.id),
      name: req.body.name,
      picture: req.body.picture,
    };
    const affectedRows = await continentRepository.update(continent);
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
    const newContinent = {
      name: req.body.name,
      picture: req.body.picture,
    };
    const insertId = await continentRepository.create(newContinent);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const continentId = Number(req.params.id);
    await continentRepository.delete(continentId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, edit, add, destroy };
