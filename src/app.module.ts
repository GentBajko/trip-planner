import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsModule } from './trips/trips.module';
import { TripEntity } from './trips/types';

import * as dotenv from 'dotenv';

dotenv.config();

const isDevelopment = process.env.ENV === 'dev';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [TripEntity],
      migrations: ['dist/migrations/*.js'],
      synchronize: isDevelopment,
    }),
    TripsModule,
  ],
})
export class AppModule {}
