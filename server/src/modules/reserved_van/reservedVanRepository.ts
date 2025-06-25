import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type ReservedVan = {
  id: number;
  roadies_id: number;
  van_id: number;
  start_date: string;
  end_date: string;
  updated_at: string;
};

type CreateReservedVanInput = {
  roadies_id: number;
  van_id: number;
  start_date: string;
  end_date: string;
  updated_at: string;
};

class ReservedVanRepository {
  async create(reservedVan: CreateReservedVanInput) {
    const isAvailable = await this.checkVanAvailability(
      reservedVan.van_id,
      reservedVan.start_date,
      reservedVan.end_date,
    );

    if (!isAvailable) {
      return { message: "Ce van est déjà réservé à ces dates ci." };
    }

    // Insert the reserved van into the database
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO reserved_van (roadies_id, van_id, start_date, end_date) VALUES (?, ?, ?, ?)",
      [
        reservedVan.roadies_id,
        reservedVan.van_id,
        reservedVan.start_date,
        reservedVan.end_date,
      ],
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "select * from reserved_van",
    );
    return rows as ReservedVan[];
  }

  async readReservedVanByRoadieId(roadies_id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
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
        `,
      [roadies_id],
    );
    return rows as ReservedVan[];
  }

  async readByRoadieAndVanId(roadies_id: number, van_id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM reserved_van WHERE roadies_id = ? AND van_id = ?",
      [roadies_id, van_id],
    );
    return rows[0] || null;
  }

  async checkVanAvailability(
    van_id: number,
    start_date: string,
    end_date: string,
  ) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT * FROM reserved_van 
       WHERE van_id = ? 
       AND NOT (end_date < ? OR start_date > ?)`,
      [van_id, start_date, end_date],
    );

    return rows.length === 0;
  }

  async update(reservedVan: ReservedVan) {
    const isAvailable = await this.checkVanAvailability(
      reservedVan.id,
      reservedVan.start_date,
      reservedVan.end_date,
    );

    if (!isAvailable) {
      return { message: "Ce van est déjà réservé à ces dates ci." };
    }

    const [result] = await databaseClient.query<Result>(
      "UPDATE reserved_van SET start_date = ?, end_date = ? WHERE id = ?",
      [reservedVan.start_date, reservedVan.end_date, reservedVan.id],
    );
    return result.affectedRows;
  }

  async deleteByRoadieAndVanId(roadies_id: number, id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM reserved_van WHERE roadies_id = ? AND id = ?",
      [roadies_id, id],
    );
    return result.affectedRows;
  }
}

export default new ReservedVanRepository();
