import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import favoriteVanActions from "./favoriteVanActions";

type FavoriteVan = {
  id: number;
  roadies_id: number;
  van_id: number;
  van_plate: string;
  name: string;
  number_plate: string;
  picture: string;
  fuel: string;
  lbs: string;
  brand: string;
  company_id: number;
};

class FavoriteVanRepository {
  async create(favoriteVan: { roadies_id: number; van_id: number }) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO favorite_van (roadies_id, van_id) VALUES (?, ?)",
      [favoriteVan.roadies_id, favoriteVan.van_id],
    );
    return result.insertId;
  }
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "select * from favorite_van",
    );
    return rows as FavoriteVan[];
  }
  async readVanByRoadieId(roadies_id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT 
        favorite_van.id AS id, 
        favorite_van.roadies_id,
        favorite_van.van_id,
        van.name,
        van.number_plate,
        van.picture,
        van.fuel,
        van.lbs,
        van.brand,
        van.company_id
      FROM favorite_van
      JOIN van ON favorite_van.van_id = van.id
      WHERE favorite_van.roadies_id = ?
      `,
      [roadies_id],
    );
    return rows as FavoriteVan[];
  }
  async readByRoadieAndVanId(roadies_id: number, van_id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM favorite_van WHERE roadies_id = ? AND van_id = ?",
      [roadies_id, van_id],
    );
    return rows[0] || null;
  }
  async update(favoriteVan: FavoriteVan) {
    const [existingRows] = await databaseClient.query<Rows>(
      "SELECT * FROM favorite_van WHERE roadies_id = ? AND van_id = ?",
      [favoriteVan.roadies_id, favoriteVan.van_id],
    );

    if (existingRows.length > 0) {
      return { message: "Van already in favorites" };
    }

    const [result] = await databaseClient.query<Result>(
      "INSERT INTO favorite_van (roadies_id, van_id) VALUES (?, ?)",
      [favoriteVan.roadies_id, favoriteVan.van_id],
    );
    return result.insertId;
  }
  async deleteByRoadieAndVanId(roadies_id: number, id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM favorite_van WHERE roadies_id = ? AND id = ?",
      [roadies_id, id],
    );
    return result.affectedRows;
  }
}

export default new FavoriteVanRepository();
