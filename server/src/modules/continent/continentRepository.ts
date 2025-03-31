import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Continent = {
  id: number;
  name: string;
  picture: string;
};

class continentRepository {
  async create(continent: Omit<Continent, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into continent (name, picture) values (?, ?)",
      [continent.name, continent.picture],
    );
    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from continent where id = ?",
      [id],
    );
    return rows[0] as Continent;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from continent");
    return rows as Continent[];
  }

  async update(continent: Continent) {
    const [result] = await databaseClient.query<Result>(
      "update continent set name = ?, picture = ? where id = ?",
      [continent.name, continent.picture],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from continent where id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new continentRepository();
