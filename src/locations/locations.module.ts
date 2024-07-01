import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocationsResolver } from './locations.resolver';
import { LocationService } from './location.service';
import { Location } from './location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  providers: [LocationService, LocationsResolver],
})
export class LocationsModule {}
