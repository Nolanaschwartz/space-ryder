import { Injectable } from '@nestjs/common';
import { Location } from './location.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async getLocations(): Promise<Location[]> {
    return this.locationRepository.find();
  }
}
