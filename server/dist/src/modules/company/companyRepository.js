"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../database/client"));
class companyRepository {
    async create(company) {
        const [result] = await client_1.default.query("insert into company (name, description, address, logo, country_id) VALUES (?, ?, ?, ?, ?)", [
            company.name,
            company.description,
            company.address,
            company.logo,
            company.country_id,
        ]);
        return result.insertId;
    }
    async read(id) {
        const [rows] = await client_1.default.query("select * from company where id = ?", [id]);
        return rows[0];
    }
    async readAll() {
        const [rows] = await client_1.default.query("select * from company");
        return rows;
    }
    async ReadAllByCountry(countryId) {
        const [rows] = await client_1.default.query("SELECT company.* FROM company JOIN country ON company.country_id = country.id WHERE country_id = ? GROUP BY company.id", [countryId]);
        return rows;
    }
    async update(company) {
        const [result] = await client_1.default.query("update company set name = ?, description = ?,address = ?, logo = ?", [company.name, company.description, company.address, company.logo]);
        return result.affectedRows;
    }
    async delete(id) {
        const [result] = await client_1.default.query("delete from company where id = ?", [id]);
        return result.affectedRows;
    }
}
exports.default = new companyRepository();
