const express = require('express');
const router = express.Router();
const kelas = require('../controllers/kelasController');

router.get('/', kelas.getAll);

module.exports = router;