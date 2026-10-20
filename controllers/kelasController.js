const db = require('../db');

exports.getAll = async (req, res) => {
  const [rows] = await db.query('SELECT id, nama, wali_kelas FROM kelas ORDER BY nama');
  res.json(rows);
};