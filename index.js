const express = require('express');
const db = require('./db');
const app = express();
app.set('trust proxy', 1);
const siswaRoutes = require('./routes/siswaRoutes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const kelasRoutes = require('./routes/kelasRoutes');
const cors = require('cors');
const helmet = require('helmet');
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));
app.use(helmet());
app.use(express.json());
app.use(logger);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Halo dari Express!');
});

app.use('/siswa', siswaRoutes);
app.use('/auth', authRoutes);
app.use('/kelas', kelasRoutes);

app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}`);
});