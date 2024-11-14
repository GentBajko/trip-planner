import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { TripEntity } from './types';

@Module({
  imports: [TypeOrmModule.forFeature([TripEntity])],
  providers: [TripsService],
  controllers: [TripsController],
})
export class TripsModule {}
