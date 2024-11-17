export class DBConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export const configureDB = (): DBConfig => ({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || '',
});
