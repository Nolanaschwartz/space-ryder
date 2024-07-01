import { Module } from '@nestjs/common';
import { Trip } from './trip.entity';
import { TripService } from './trip.service';
import { TripsResolver } from './trips.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from '../locations/location.entity';
import { SpaceShip } from '../space-ships/space-ship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trip, Location, SpaceShip])],
  providers: [TripService, TripsResolver],
})
export class TripsModule {}
