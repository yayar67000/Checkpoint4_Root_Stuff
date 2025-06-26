"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../database/client"));
class vanRepository {
    async create(van) {
        const [result] = await client_1.default.query("insert into van (name, number_plate, picture, fuel, lbs, brand, company_id) VALUES (?, ?, ?, ?, ?, ?, ?)", [
            van.name,
            van.number_plate,
            van.picture,
            van.fuel,
            van.lbs,
            van.brand,
            van.company_id,
        ]);
        return result.insertId;
    }
    async read(id) {
        const [rows] = await client_1.default.query("select * from van where id = ?", [id]);
        return rows[0];
    }
    async readAll() {
        const [rows] = await client_1.default.query("select * from van");
        return rows;
    }
    async readAllByCompany(id) {
        const [rows] = await client_1.default.query("SELECT van.* FROM van JOIN company ON van.company_id = company.id WHERE van.company_id = ? GROUP BY van.id", [id]);
        return rows;
    }
    async update(van) {
        const [result] = await client_1.default.query("update van set name = ?, number_plate = ?, picture = ?, fuel = ?, lbs = ?, brand = ?, company_id = ? where id = ?", [
            van.name,
            van.number_plate,
            van.picture,
            van.fuel,
            van.lbs,
            van.brand,
            van.company_id,
            van.id,
        ]);
        return result.affectedRows;
    }
    async delete(id) {
        const [result] = await client_1.default.query("delete from van where id = ?", [id]);
        return result.affectedRows;
    }
}
exports.default = new vanRepository();
