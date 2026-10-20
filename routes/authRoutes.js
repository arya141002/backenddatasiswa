const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const { loginLimiter } = require('../middleware/rateLimiter');
const { registerSchema, loginSchema } = require('../schemas/authSchema');
const validate = require('../middleware/validate');

router.post('/register', validate(registerSchema), auth.register);
router.post('/login', loginLimiter, validate(loginSchema), auth.login);

module.exports = router;