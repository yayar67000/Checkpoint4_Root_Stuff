import type { RequestHandler } from "express";
import favoriteVanRepository from "./favoriteVanRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const favoriteVan = await favoriteVanRepository.readAll();
    res.json(favoriteVan);
  } catch (err) {
    next(err);
  }
};

const readByRoadie: RequestHandler = async (req, res, next) => {
  try {
    const roadieId = req.roadie.id;

    if (!roadieId) {
      res.status(401).json({ error: "Unauthorized: Roadie ID is missing" });
      return;
    }

    const favoriteVans =
      await favoriteVanRepository.readVanByRoadieId(roadieId);

    if (!favoriteVans || favoriteVans.length === 0) {
      res.status(404).json({ error: "No favorite vans found" });
      return;
    }

    res.status(200).json(favoriteVans);
  } catch (err) {
    next(err);
  }
};

const addFavoriteVan: RequestHandler = async (req, res, next) => {
  try {
    const roadies_id = req.roadie.id; // ID du roadie connecté
    const { van_id } = req.body;

    if (!van_id) {
      res.status(400).json({ error: "van_id est requis" });
      return;
    }

    const existingFavorite = await favoriteVanRepository.readByRoadieAndVanId(
      roadies_id,
      van_id,
    );

    if (existingFavorite) {
      res.status(400).json({ error: "Ce van est déjà dans vos favoris." });
      return;
    }

    const newFavoriteVan = { roadies_id, van_id };
    const insertId = await favoriteVanRepository.create(newFavoriteVan);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroyFavoriteVan: RequestHandler = async (req, res, next) => {
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

    const affectedRows = await favoriteVanRepository.deleteByRoadieAndVanId(
      roadieId,
      favoriteVanId,
    );

    if (affectedRows === 0) {
      res.status(404).json({ error: "Favorite van not found" });
      return;
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  readByRoadie,
  addFavoriteVan,
  destroyFavoriteVan,
};
