import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Location } from '../locations/location.entity';
import { Trip } from '../trips/trip.entity';

export const SHIP_SPEED_MPH = 1000;

@ObjectType()
@Entity()
export class SpaceShip {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => Location, { nullable: true })
  @ManyToOne(() => Location, { nullable: true })
  location?: Location;

  @Field(() => String)
  @Column({ unique: true })
  name!: string;

  @Field(() => [Trip])
  @OneToMany(() => Trip, (trip) => trip.spaceShip)
  trips!: Trip[];

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
