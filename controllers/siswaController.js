const db = require('../db');

exports.getAll = async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
  const offset = (page - 1) * limit;

  const kondisi = [];
  const nilai = [];

  if (req.query.kelas) {
    kondisi.push('k.nama = ?');
    nilai.push(req.query.kelas);
  }
  if (req.query.cari) {
    kondisi.push('s.nama LIKE ?');
    nilai.push(`%${req.query.cari}%`);
  }

  const where = kondisi.length ? 'WHERE ' + kondisi.join(' AND ') : '';

  const [[{ total }]] = await db.query(
    `SELECT COUNT(*) AS total FROM siswa s ${where}`,
    nilai
  );

  const [rows] = await db.query(
    `SELECT s.id, s.nama, k.nama AS kelas, s.kelas_id
    FROM siswa s
    JOIN kelas k ON k.id = s.kelas_id
    ${where}
    ORDER BY s.id LIMIT ? OFFSET ?`,
    [...nilai, limit, offset]
  );

  res.json({
    data: rows,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit)
  });
};

exports.getById = async (req, res) => {
    const [rows] = await db.query('SELECT * FROM siswa WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ pesan: 'Siswa tidak ditemukan' });
    }
    res.json(rows[0]);
};

exports.create = async (req, res) => {
    const { nama, kelas_id } = req.body;
    if (!nama || !kelas_id) {
      return res.status(400).json({ pesan: 'Nama dan kelas_id wajib diisi' });
    }
    const [result] = await db.query('INSERT INTO siswa (nama, kelas_id) VALUES (?, ?)', [nama, kelas_id]);
    res.status(201).json({ id: result.insertId, nama, kelas_id });
};

exports.update = async (req, res) => {
    const { nama, kelas_id } = req.body;
    if (!nama || !kelas_id) {
      return res.status(400).json({ pesan: 'Nama dan kelas_id wajib diisi' });
    }
    const [result] = await db.query(
      'UPDATE siswa SET nama = ?, kelas_id = ? WHERE id = ?',
      [nama, kelas_id, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ pesan: 'Siswa tidak ditemukan' });
    }

    res.json({ id: Number(req.params.id), nama, kelas_id });
};

exports.remove = async (req, res) => {
    const [result] = await db.query('DELETE FROM siswa WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ pesan: 'Siswa tidak ditemukan' });
    }
    res.json({ pesan: 'Siswa berhasil dihapus' });
};
