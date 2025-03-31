import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Company = {
  id: number;
  name: string;
  description: string;
  address: string;
  logo: string;
  country_id: number;
};

class companyRepository {
  async create(company: Omit<Company, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into company (name, description, address, logo, country_id) VALUES (?, ?, ?, ?, ?)",
      [
        company.name,
        company.description,
        company.address,
        company.logo,
        company.country_id,
      ],
    );
    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from company where id = ?",
      [id],
    );
    return rows[0] as Company;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from company");
    return rows as Company[];
  }

  async update(company: Company) {
    const [result] = await databaseClient.query<Result>(
      "update company set name = ?, description = ?,address = ?, logo = ?",
      [company.name, company.description, company.address, company.logo],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from company where id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new companyRepository();
