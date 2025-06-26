"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../database/client"));
class roadiesRepository {
    async create(roadies) {
        const [result] = await client_1.default.query("insert into roadies (firstname, lastname, email, hashed_password) values (?, ?, ?, ?)", [
            roadies.firstname,
            roadies.lastname,
            roadies.email,
            roadies.hashed_password,
        ]);
        return result.insertId;
    }
    async read(id) {
        const [rows] = await client_1.default.query("select * from roadies where id = ?", [id]);
        return rows[0];
    }
    async readGeneralDetails(id) {
        const [rows] = await client_1.default.query("select roadies.firstname, roadies.lastname, roadies.email from roadies where id = ?", [id]);
        return rows[0];
    }
    async readByEmailWithPassword(email, firstname) {
        const [rows] = await client_1.default.query("select * from roadies where email = ?", [email, firstname]);
        return rows[0];
    }
    async readAll() {
        const [rows] = await client_1.default.query("select * from roadies");
        return rows;
    }
    async update(editRoadie) {
        if (!editRoadie.id || Number.isNaN(Number(editRoadie.id))) {
            throw new Error("Invalid roadie ID");
        }
        const [result] = await client_1.default.query("update roadies set firstname = ?, lastname = ?, email = ? where id = ?", [
            editRoadie.firstname,
            editRoadie.lastname,
            editRoadie.email,
            editRoadie.id,
        ]);
        return result.affectedRows;
    }
    async delete(id) {
        const [result] = await client_1.default.query("delete from roadies where id = ?", [id]);
        return result.affectedRows;
    }
}
exports.default = new roadiesRepository();
