import { Injectable } from '@nestjs/common';

import { SpaceShip } from './space-ship.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SpaceShipService {
  constructor(
    @InjectRepository(SpaceShip)
    private readonly spaceShipRepository: Repository<SpaceShip>,
  ) {}
  getSpaceShips(): Promise<SpaceShip[]> {
    return this.spaceShipRepository.find({
      relations: {
        location: true,
      },
    });
  }
}
