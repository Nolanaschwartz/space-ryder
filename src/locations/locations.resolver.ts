import { Query, Resolver } from '@nestjs/graphql';
import { Location } from './location.entity';
import { LocationService } from './location.service';
@Resolver()
export class LocationsResolver {
  constructor(private readonly locationService: LocationService) {}
  @Query(() => [Location])
  async getLocations() {
    return this.locationService.getLocations();
  }
}
