const express = require('express');
const router = express.Router();
const siswa = require('../controllers/siswaController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { siswaSchema } = require('../schemas/siswaSchema');

router.get('/', siswa.getAll);
router.get('/:id', siswa.getById);
router.post('/', auth, validate(siswaSchema), siswa.create);
router.put('/:id', auth, validate(siswaSchema), siswa.update);
router.delete('/:id', auth, siswa.remove);

module.exports = router;