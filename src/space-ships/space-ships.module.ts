import { Module } from '@nestjs/common';
import { SpaceShipService } from './space-ship.service';
import { SpaceShipsResolver } from './space-ships.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceShip } from './space-ship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceShip])],
  providers: [SpaceShipService, SpaceShipsResolver],
})
export class SpaceShipsModule {}
