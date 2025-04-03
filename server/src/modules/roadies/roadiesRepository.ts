import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Roadies = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  hashed_password: string;
};

class roadiesRepository {
  async create(roadies: Omit<Roadies, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into roadies (firstname, lastname, email, hashed_password) values (?, ?, ?, ?)",
      [
        roadies.firstname,
        roadies.lastname,
        roadies.email,
        roadies.hashed_password,
      ],
    );
    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from roadies where id = ?",
      [id],
    );
    return rows[0] as Roadies;
  }

  async readByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from roadies where email = ?",
      [email],
    );

    return rows[0] as Roadies;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from roadies");

    return rows as Roadies[];
  }

  async update(roadies: Roadies) {
    const [result] = await databaseClient.query<Result>(
      "update roadies set firstname = ?, lastname = ?, email = ?, hashed_password = ? where id = ?",
      [
        roadies.firstname,
        roadies.lastname,
        roadies.email,
        roadies.hashed_password,
        roadies.id,
      ],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from roadies where id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new roadiesRepository();
