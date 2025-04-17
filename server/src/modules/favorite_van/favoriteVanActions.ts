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
    const roadieId = Number(req.params.roadie_id);
    const favoriteVans =
      await favoriteVanRepository.readVanByRoadieId(roadieId);

    if (!favoriteVans || favoriteVans.length === 0) {
      res.sendStatus(404);
    } else {
      const response = favoriteVans.map((favoriteVan) => ({
        id: favoriteVan.id,
        roadies_id: favoriteVan.roadies_id,
        van_id: favoriteVan.van_id,
        name: favoriteVan.name,
        number_plate: favoriteVan.number_plate,
        picture: favoriteVan.picture,
        fuel: favoriteVan.fuel,
        lbs: favoriteVan.lbs,
        brand: favoriteVan.brand,
        company_id: favoriteVan.company_id,
      }));
      res.json(response);
    }
  } catch (err) {
    next(err);
  }
};

const addFavoriteVan: RequestHandler = async (req, res, next) => {
  try {
    const newFavoriteVan = {
      roadies_id: req.roadie.id,
      van_id: req.body.van_id,
    };

    const insertId = await favoriteVanRepository.create(newFavoriteVan);

    res.status(201).json({ insertId });
  } catch (err) {
    if (typeof err === "object" && err !== null && "code" in err) {
      const error = err as { code: string };

      if (error.code === "ER_DUP_ENTRY") {
        void res
          .status(400)
          .json({ error: "Vous avez déjà envoyé votre candidature." });
        return;
      }
    }
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
