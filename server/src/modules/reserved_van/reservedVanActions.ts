import type { RequestHandler } from "express";
import reservedVanRepository from "./reservedVanRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const reservedVan = await reservedVanRepository.readAll();
    res.json(reservedVan);
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

    const reservedVans =
      await reservedVanRepository.readReservedVanByRoadieId(roadieId);

    if (!reservedVans || reservedVans.length === 0) {
      res.status(404).json({ error: "No reserved vans found" });
      return;
    }

    res.status(200).json(reservedVans);
  } catch (err) {
    next(err);
  }
};

const addReservedVan: RequestHandler = async (req, res, next) => {
  try {
    const roadies_id = req.roadie.id;
    const { van_id, start_date, end_date } = req.body;

    if (!van_id) {
      res.status(400).json({ error: "van_id est requis" });
      return;
    }

    const existingReservedVan =
      await reservedVanRepository.readByRoadieAndVanId(roadies_id, van_id);

    if (existingReservedVan) {
      res.status(400).json({ error: "Ce van est déjà réservé." });
      return;
    }

    const newReservedVan = { roadies_id, van_id, start_date, end_date };
    const insertId = await reservedVanRepository.create(newReservedVan);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroyReservedVan: RequestHandler = async (req, res, next) => {
  try {
    const roadieId = req.roadie.id;
    const reservedVanId = Number(req.params.id);

    if (!roadieId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (Number.isNaN(reservedVanId)) {
      res.status(400).json({ error: "Invalid reserved van ID" });
      return;
    }

    const affectedRows = await reservedVanRepository.deleteByRoadieAndVanId(
      roadieId,
      reservedVanId,
    );

    if (affectedRows === 0) {
      res.status(404).json({ error: "Reserved van not found" });
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
  addReservedVan,
  destroyReservedVan,
};
