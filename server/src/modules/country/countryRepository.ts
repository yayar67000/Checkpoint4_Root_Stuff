import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Country = {
  id: number;
  name: string;
  picture: string;
  continent_id: number;
};

class countryRepository {
  async create(country: Omit<Country, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into country (name, picture, continent_id) values (?,?,?)",
      [country.name, country.picture, country.continent_id],
    );
    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from country where id =?",
      [id],
    );
    return rows[0] as Country;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from country");
    return rows as Country[];
  }

  async update(country: Country) {
    const [result] = await databaseClient.query<Result>(
      "update country set name = ?, picture = ?, continent_id = ? where id = ?",
      [country.name, country.picture, country.continent_id, country.id],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from country where id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new countryRepository();
