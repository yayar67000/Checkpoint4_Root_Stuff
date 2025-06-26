"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../database/client"));
class ReservedVanRepository {
    async create(reservedVan) {
        const isAvailable = await this.checkVanAvailability(reservedVan.van_id, reservedVan.start_date, reservedVan.end_date);
        if (!isAvailable) {
            return { message: "Ce van est déjà réservé à ces dates ci." };
        }
        // Insert the reserved van into the database
        const [result] = await client_1.default.query("INSERT INTO reserved_van (roadies_id, van_id, start_date, end_date) VALUES (?, ?, ?, ?)", [
            reservedVan.roadies_id,
            reservedVan.van_id,
            reservedVan.start_date,
            reservedVan.end_date,
        ]);
        return result.insertId;
    }
    async readAll() {
        const [rows] = await client_1.default.query("select * from reserved_van");
        return rows;
    }
    async readReservedVanByRoadieId(roadies_id) {
        const [rows] = await client_1.default.query(`
        SELECT 
          reserved_van.id AS id, 
          reserved_van.roadies_id,
          reserved_van.van_id,
          reserved_van.start_date,
          reserved_van.end_date,
          reserved_van.updated_at,
          van.name,
          van.number_plate,
          van.picture,
          van.fuel,
          van.lbs,
          van.brand,
          van.company_id
        FROM reserved_van
        JOIN van ON reserved_van.van_id = van.id
        WHERE reserved_van.roadies_id = ?
        `, [roadies_id]);
        return rows;
    }
    async readByRoadieAndVanId(roadies_id, van_id) {
        const [rows] = await client_1.default.query("SELECT * FROM reserved_van WHERE roadies_id = ? AND van_id = ?", [roadies_id, van_id]);
        return rows[0] || null;
    }
    async checkVanAvailability(van_id, start_date, end_date) {
        const [rows] = await client_1.default.query(`SELECT * FROM reserved_van 
       WHERE van_id = ? 
       AND NOT (end_date < ? OR start_date > ?)`, [van_id, start_date, end_date]);
        return rows.length === 0;
    }
    async update(reservedVan) {
        const isAvailable = await this.checkVanAvailability(reservedVan.id, reservedVan.start_date, reservedVan.end_date);
        if (!isAvailable) {
            return { message: "Ce van est déjà réservé à ces dates ci." };
        }
        const [result] = await client_1.default.query("UPDATE reserved_van SET start_date = ?, end_date = ? WHERE id = ?", [reservedVan.start_date, reservedVan.end_date, reservedVan.id]);
        return result.affectedRows;
    }
    async deleteByRoadieAndVanId(roadies_id, id) {
        const [result] = await client_1.default.query("DELETE FROM reserved_van WHERE roadies_id = ? AND id = ?", [roadies_id, id]);
        return result.affectedRows;
    }
}
exports.default = new ReservedVanRepository();
