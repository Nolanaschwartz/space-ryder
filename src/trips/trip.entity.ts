import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { Location } from '../locations/location.entity';
import { SpaceShip } from "../space-ships/space-ship.entity";

export enum TripStatus {
  SCHEDULED = 'SCHEDULED',
  IN_FLIGHT = 'IN_FLIGHT',
  LANDED = 'LANDED',
  CANCELLED = 'CANCELLED',
}

registerEnumType(TripStatus, {
  name: 'TripStatus',
});



@ObjectType()
@Entity()
export class Trip {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  tripId!: string;

  @Field(() => Location)
  @ManyToOne(() => Location)
  departureLocation!: Location;

  @Field(() => Location)
  @ManyToOne(() => Location)
  arrivalLocation!: Location;

  @Field(() => TripStatus)
  @Column({ type: 'enum', enum: TripStatus, default: TripStatus.SCHEDULED })
  tripStatus!: TripStatus;

  @Field(() => SpaceShip)
  @ManyToOne(() => SpaceShip)
  spaceShip!: SpaceShip;

  @Field(() => Date)
  @Column({ type: 'timestamp' })
  departureAt!: Date;

  @Field(() => Date)
  @Column({ type: 'timestamp' })
  arrivalAt!: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
