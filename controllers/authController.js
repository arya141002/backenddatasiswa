const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ pesan: 'Username dan password wajib diisi' });
  }
  if (password.length < 6) {
    return res.status(400).json({ pesan: 'Password minimal 6 karakter' });
  }

  const [ada] = await db.query('SELECT id FROM users WHERE username = ?', [username]);
  if (ada.length > 0) {
    return res.status(409).json({ pesan: 'Username sudah dipakai' });
  }

  const hash = await bcrypt.hash(password, 10);
  const [result] = await db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hash]
  );

  res.status(201).json({ id: result.insertId, username });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ pesan: 'Username dan password wajib diisi' });
  }

  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  const user = rows[0];

  const cocok = user && (await bcrypt.compare(password, user.password));
  if (!cocok) {
    return res.status(401).json({ pesan: 'Username atau password salah' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token });
};