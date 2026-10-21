require('dotenv').config();
const db = require('./db');

async function checkConnection() {
  try {
    console.log('Mencoba terhubung ke Railway MySQL...');
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`Port: ${process.env.DB_PORT}`);
    
    // Jalankan query sederhana
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    console.log('✅ KONEKSI BERHASIL!');
    console.log('Hasil tes query:', rows);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ KONEKSI GAGAL!');
    console.error('Detail Error:', error);
    process.exit(1);
  }
}

checkConnection();