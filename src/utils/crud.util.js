const db = require("../configs/db");

const CrudUtil = {
  async findAll(table, options = {}) {
    let sql = `SELECT * FROM ${table}`;
    if (options.orderBy) {
      sql += ` ORDER BY ${options.orderBy.field} ${options.orderBy.dir}`;
    }
    const [rows] = await db.query(sql);
    return rows;
  },

  async findById(table, id) {
    const [rows] = await db.query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
    return rows[0];
  },

  async findByField(table, field, value) {
    const [rows] = await db.query(`SELECT * FROM ${table} WHERE ${field} = ?`, [
      value,
    ]);
    return rows[0];
  },

  async create(table, data) {
    const columns = Object.keys(data).join(", ");
    const values = Object.values(data);
    const placeholders = values.map(() => "?").join(", ");

    const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
    const [result] = await db.execute(sql, values);
    return result;
  },

  async update(table, id, data) {
    const fields = Object.keys(data)
      .map((field) => `${field} = ?`)
      .join(", ");
    const values = [...Object.values(data), id];

    const sql = `UPDATE ${table} SET ${fields} WHERE id = ?`;
    const [result] = await db.execute(sql, values);
    return result;
  },

  async destroy(table, id) {
    const [result] = await db.execute(`DELETE FROM ${table} WHERE id = ?`, [
      id,
    ]);
    return result;
  },
};

module.exports = CrudUtil;
