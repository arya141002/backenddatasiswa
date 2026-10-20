module.exports = (schema) => (req, res, next) => {
  const hasil = schema.safeParse(req.body);

  if (!hasil.success) {
    return res.status(400).json({
      pesan: 'Data tidak valid',
      galat: hasil.error.issues.map((i) => ({
        field: i.path.join('.'),
        pesan: i.message
      }))
    });
  }

  req.body = hasil.data;
  next();
};