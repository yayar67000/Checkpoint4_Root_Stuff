import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Van = {
  id: number;
  name: string;
  number_plate: string;
  picture: string;
  fuel: string;
  lbs: string;
  brand: string;
  company_id: number;
};

class vanRepository {
  async create(van: Omit<Van, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into van (name, number_plate, picture, fuel, lbs, brand, company_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        van.name,
        van.number_plate,
        van.picture,
        van.fuel,
        van.lbs,
        van.brand,
        van.company_id,
      ],
    );
    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from van where id = ?",
      [id],
    );
    return rows[0] as Van;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from van");
    return rows as Van[];
  }

  async readAllByCompany(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT van.*, company.name AS company_name, company.description AS company_description, company.address AS company_address, company.logo AS company_logo FROM van JOIN company ON van.company_id = company.id WHERE van.company_id = ? GROUP BY van.id",
      [id],
    );
    return rows as Van[];
  }

  async update(van: Van) {
    const [result] = await databaseClient.query<Result>(
      "update van set name = ?, number_plate = ?, picture = ?, fuel = ?, lbs = ?, brand = ?, company_id = ? where id = ?",
      [
        van.name,
        van.number_plate,
        van.picture,
        van.fuel,
        van.lbs,
        van.brand,
        van.company_id,
        van.id,
      ],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from van where id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new vanRepository();
