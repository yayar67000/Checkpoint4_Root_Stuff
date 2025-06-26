"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../database/client"));
class FavoriteVanRepository {
    async create(favoriteVan) {
        const [result] = await client_1.default.query("INSERT INTO favorite_van (roadies_id, van_id) VALUES (?, ?)", [favoriteVan.roadies_id, favoriteVan.van_id]);
        return result.insertId;
    }
    async readAll() {
        const [rows] = await client_1.default.query("select * from favorite_van");
        return rows;
    }
    async readVanByRoadieId(roadies_id) {
        const [rows] = await client_1.default.query(`
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
      `, [roadies_id]);
        return rows;
    }
    async readByRoadieAndVanId(roadies_id, van_id) {
        const [rows] = await client_1.default.query("SELECT * FROM favorite_van WHERE roadies_id = ? AND van_id = ?", [roadies_id, van_id]);
        return rows[0] || null;
    }
    async update(favoriteVan) {
        const [existingRows] = await client_1.default.query("SELECT * FROM favorite_van WHERE roadies_id = ? AND van_id = ?", [favoriteVan.roadies_id, favoriteVan.van_id]);
        if (existingRows.length > 0) {
            return { message: "Van already in favorites" };
        }
        const [result] = await client_1.default.query("INSERT INTO favorite_van (roadies_id, van_id) VALUES (?, ?)", [favoriteVan.roadies_id, favoriteVan.van_id]);
        return result.insertId;
    }
    async deleteByRoadieAndVanId(roadies_id, id) {
        const [result] = await client_1.default.query("DELETE FROM favorite_van WHERE roadies_id = ? AND id = ?", [roadies_id, id]);
        return result.affectedRows;
    }
}
exports.default = new FavoriteVanRepository();
