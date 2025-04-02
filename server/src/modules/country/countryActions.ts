import type { RequestHandler } from "express";
import countryRepository from "./countryRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const country = await countryRepository.readAll();
    res.json(country);
  } catch (err) {
    next(err);
  }
};

const browseByContinent: RequestHandler = async (req, res, next) => {
  try {
    const continentId = Number(req.params.id);
    const countries =
      await countryRepository.readCountriesBYContinent(continentId);
    res.json(countries);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const countryId = Number(req.params.id);
    const country = await countryRepository.read(countryId);

    if (country == null) {
      res.sendStatus(404);
    } else {
      res.json(country);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const country = {
      id: Number(req.params.id),
      name: req.body.name,
      picture: req.body.picture,
      continent_id: req.body.continent_id,
    };
    const affectedRows = await countryRepository.update(country);
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
    const newcountry = {
      name: req.body.name,
      picture: req.body.picture,
      continent_id: req.body.continent_id,
    };
    const insertId = await countryRepository.create(newcountry);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const countryId = Number(req.params.id);
    await countryRepository.delete(countryId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, browseByContinent, read, edit, add, destroy };
