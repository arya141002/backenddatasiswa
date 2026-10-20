const rateLimit = require('express-rate-limit');

exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // jendela waktu: 15 menit
  limit: 5,                    // maksimal 5 percobaan per IP dalam jendela itu
  standardHeaders: true,       // kirim header RateLimit-* ke client
  legacyHeaders: false,
  message: { pesan: 'Terlalu banyak percobaan login, coba lagi nanti' }
});