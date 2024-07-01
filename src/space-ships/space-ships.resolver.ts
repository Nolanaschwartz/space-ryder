import { Query, Resolver } from '@nestjs/graphql';
import { SpaceShipService } from "./space-ship.service";
import { SpaceShip } from "./space-ship.entity";

@Resolver()
export class SpaceShipsResolver {
  constructor(private readonly spaceShipService: SpaceShipService) {
  }
  @Query(() => [SpaceShip])
  getSpaceShips(): Promise<SpaceShip[]> {
    return this.spaceShipService.getSpaceShips();
  }
}
