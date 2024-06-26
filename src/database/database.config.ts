import { registerAs } from '@nestjs/config';

export default registerAs('databaseConfig', () => ({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 3000,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  logging: Boolean(process.env.DB_LOG),
  synchronize: Boolean(process.env.DB_SYNC),
}));
