import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import * as process from 'node:process';
config();

export function createDataSourceOptions(): DataSourceOptions {
  return {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  };
}

export default new DataSource(createDataSourceOptions());
