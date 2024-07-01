import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTripInput {
  @Field()
  departureLocationCode: string;

  @Field()
  arrivalLocationCode: string;

  @Field()
  departureAt: Date;

  @Field()
  spaceshipId: number;
}

@InputType()
export class CancelTripInput {
  @Field()
  tripId: number;
}

@InputType()
export class GetTripInput {
  @Field()
  tripId: number;
}
