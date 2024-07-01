import { InjectRepository } from '@nestjs/typeorm';
import { Trip, TripStatus } from './trip.entity';
import { Location } from '../locations/location.entity';
import { Repository, MoreThan } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { SHIP_SPEED_MPH, SpaceShip } from '../space-ships/space-ship.entity';
import { CancelTripInput, CreateTripInput, GetTripInput } from './types';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip) private readonly tripRepository: Repository<Trip>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(SpaceShip)
    private readonly spaceShipRepository: Repository<SpaceShip>,
  ) {}

  async getTrip(input: GetTripInput): Promise<Trip> {
    let trip = await this.tripRepository.findOne({
      where: { tripId: input.tripId.toString() },
    });

    if (!trip) throw new Error('Trip not found');

    trip = await this.processTripStatus(trip);

    return trip;
  }

  // TODO: Abstract to a process service/cron job
  async processTripStatus(trip: Trip): Promise<Trip> {
    const currentTime = new Date();

    if (trip.tripStatus === TripStatus.CANCELLED) {
      return trip;
    }

    if (trip.arrivalAt < currentTime) {
      trip.tripStatus = TripStatus.LANDED;
      trip = await this.tripRepository.save(trip);
    }

    if (trip.arrivalAt > currentTime && trip.departureAt < currentTime) {
      trip.tripStatus = TripStatus.IN_FLIGHT;
      trip = await this.tripRepository.save(trip);
    }
    return trip;
  }
  async cancelTrip(input: CancelTripInput): Promise<Trip> {
    const trip = await this.tripRepository.findOne({
      where: {
        tripId: input.tripId.toString(),
        tripStatus: TripStatus.SCHEDULED,
        departureAt: MoreThan(new Date()),
      },
    });

    if (!trip) throw new Error('Trip cannot be cancelled');

    trip.tripStatus = TripStatus.CANCELLED;

    return await this.tripRepository.save(trip);
  }

  // TODO: Implement a validation service
  async createTrip(createTripInput: CreateTripInput): Promise<Trip> {
    const {
      departureLocationCode,
      arrivalLocationCode,
      departureAt,
      spaceshipId,
    } = createTripInput;

    console.log(createTripInput);

    const departureLocation = await this.locationRepository.findOne({
      where: { ticker: departureLocationCode },
    });
    const arrivalLocation = await this.locationRepository.findOne({
      where: { ticker: arrivalLocationCode },
    });

    if (!departureLocation || !arrivalLocation)
      throw new Error('Invalid locations');

    // check if spaceship will be at the departure location at the departure time
    const spaceship = await this.spaceShipRepository.findOne({
      where: {
        id: spaceshipId.toString(),
      },
      relations: {
        location: true,
        trips: {
          departureLocation: true,
          arrivalLocation: true,
        },
      },
      order: {
        trips: {
          arrivalAt: 'DESC',
        },
      },
    });

    console.log(spaceship);

    if (!spaceship) throw new Error('Invalid spaceship');

    if (
      !spaceship.trips.length &&
      spaceship.location.id !== departureLocation.id
    ) {
      throw new Error('Spaceship is not at the departure location');
    }

    if (spaceship.trips.length) {
      const lastTrip = spaceship.trips[0];
      if (
        lastTrip.arrivalLocation.ticker !== departureLocationCode ||
        lastTrip.arrivalAt > departureAt
      ) {
        throw new Error('Spaceship will not be at the departure location');
      }
    }

    const arrivalAt = await this.calculateArrivalTime(
      departureAt,
      departureLocation,
      arrivalLocation,
    );

    const trip = this.tripRepository.create({
      departureLocation,
      arrivalLocation,
      departureAt,
      arrivalAt,
      spaceShip: spaceship,
      tripStatus: TripStatus.SCHEDULED,
    });

    return await this.tripRepository.save(trip);
  }

  async calculateArrivalTime(
    departureAt: Date,
    departureLocation: Location,
    arrivalLocation: Location,
  ): Promise<Date> {
    const distance = this.calculateDistance(
      departureLocation.latitude,
      departureLocation.longitude,
      arrivalLocation.latitude,
      arrivalLocation.longitude,
    );

    const duration = distance / SHIP_SPEED_MPH;
    return new Date(departureAt.getTime() + duration * 60 * 60 * 1000);
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    const distanceInMiles = distance * 0.621371; // Convert to miles
    return distanceInMiles;
  }
}
