"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../database/client"));
class countryRepository {
    async create(country) {
        const [result] = await client_1.default.query("insert into country (name, picture, continent_id) values (?,?,?)", [country.name, country.picture, country.continent_id]);
        return result.insertId;
    }
    async read(id) {
        const [rows] = await client_1.default.query("select * from country where id =?", [id]);
        return rows[0];
    }
    async readCountriesBYContinent(id) {
        const [rows] = await client_1.default.query("SELECT country.* FROM country JOIN continent ON country.continent_id = continent.id WHERE country.continent_id = ? GROUP BY country.id", [id]);
        return rows;
    }
    async readAll() {
        const [rows] = await client_1.default.query("select * from country");
        return rows;
    }
    async update(country) {
        const [result] = await client_1.default.query("update country set name = ?, picture = ?, continent_id = ? where id = ?", [country.name, country.picture, country.continent_id, country.id]);
        return result.affectedRows;
    }
    async delete(id) {
        const [result] = await client_1.default.query("delete from country where id = ?", [id]);
        return result.affectedRows;
    }
}
exports.default = new countryRepository();
