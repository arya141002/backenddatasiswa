const { z } = require('zod');

exports.siswaSchema = z.object({
  nama: z.string().trim().min(2, 'Nama minimal 2 karakter').max(100),
  kelas_id: z.coerce.number().int().positive('kelas_id harus angka positif')
});