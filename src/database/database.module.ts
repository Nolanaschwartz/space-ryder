import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createDataSourceOptions } from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(createDataSourceOptions())],
})
export class DatabaseModule {}
