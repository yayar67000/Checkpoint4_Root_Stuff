"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../database/client"));
class continentRepository {
    async create(continent) {
        const [result] = await client_1.default.query("insert into continent (name, picture) values (?, ?)", [continent.name, continent.picture]);
        return result.insertId;
    }
    async read(id) {
        const [rows] = await client_1.default.query("select * from continent where id = ?", [id]);
        return rows[0];
    }
    async readAll() {
        const [rows] = await client_1.default.query("select * from continent");
        return rows;
    }
    async update(continent) {
        const [result] = await client_1.default.query("update continent set name = ?, picture = ? where id = ?", [continent.name, continent.picture]);
        return result.affectedRows;
    }
    async delete(id) {
        const [result] = await client_1.default.query("delete from continent where id = ?", [id]);
        return result.affectedRows;
    }
}
exports.default = new continentRepository();
