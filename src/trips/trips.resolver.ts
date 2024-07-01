import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TripService } from './trip.service';
import { Trip } from './trip.entity';
import { CancelTripInput, CreateTripInput, GetTripInput } from './types';

@Resolver()
export class TripsResolver {
  constructor(private readonly tripService: TripService) {}

  @Query(() => Trip)
  getTrip(@Args('GetTripInput') input: GetTripInput): Promise<Trip> {
    return this.tripService.getTrip(input);
  }

  @Mutation(() => Trip)
  cancelTrip(@Args('CancelTripInput') input: CancelTripInput): Promise<Trip> {
    return this.tripService.cancelTrip(input);
  }

  @Mutation(() => Trip)
  createTrip(@Args('CreateTripInput') input: CreateTripInput): Promise<Trip> {
    return this.tripService.createTrip(input);
  }
}
