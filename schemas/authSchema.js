const { z } = require('zod');

exports.registerSchema = z.object({
  username: z.string().trim().min(3, 'Username minimal 3 karakter').max(50),
  password: z.string().min(6, 'Password minimal 6 karakter')
});

exports.loginSchema = z.object({
  username: z.string().min(1, 'Username wajib diisi'),
  password: z.string().min(1, 'Password wajib diisi')
});