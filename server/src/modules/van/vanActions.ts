import type { RequestHandler } from "express";
import vanRepository from "./vanRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const van = await vanRepository.readAll();
    res.json(van);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const vanId = Number(req.params.id);
    const van = await vanRepository.read(vanId);

    if (van == null) {
      res.sendStatus(404);
    } else {
      res.json(van);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const van = {
      id: Number(req.params.id),
      name: req.body.name,
      number_plate: req.body.number_plate,
      picture: req.body.picture,
      fuel: req.body.fuel,
      lbs: req.body.lbs,
      brand: req.body.brand,
      company_id: req.body.company_id,
    };

    const affectedRows = await vanRepository.update(van);

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
    const newVan = {
      name: req.body.name,
      number_plate: req.body.number_plate,
      picture: req.body.picture,
      fuel: req.body.fuel,
      lbs: req.body.lbs,
      brand: req.body.brand,
      company_id: req.body.company_id,
    };
    const insertId = await vanRepository.create(newVan);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const vanId = Number(req.params.id);
    await vanRepository.delete(vanId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, edit, add, destroy };
