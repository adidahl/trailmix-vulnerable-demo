export const config = {
  port: Number(process.env.PORT || 4000),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  webOrigin: process.env.WEB_ORIGIN || 'http://localhost:5173',
  mailerKey: process.env.MAILER_KEY || 'SG.tmdemo9d8c7b6a5f4e3d2c1b0a.Zm9vYmFyYmF6cXV4MTIzNDU2Nzg5MGFiY2RlZmdoaWo',
  uploadDir: process.env.UPLOAD_DIR || 'uploads',
};
