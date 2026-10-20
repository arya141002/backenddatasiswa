module.exports = (err, req, res, next) => {
  console.error(err);
  if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    return res.status(400).json({ pesan: 'Kelas tidak ditemukan' });
  }
  res.status(err.status || 500).json({
    pesan: err.status ? err.message : 'Terjadi kesalahan pada server'
  });
};
