import { SpaceShip } from '../space-ships/space-ship.entity';
import { Location } from '../locations/location.entity';

import appDataSource from './ormconfig';

const spaceShips: Partial<SpaceShip>[] = [
  {
    name: 'Galactic Voyager',
  },
  {
    name: 'Star Hopper',
  },
  {
    name: 'Cosmic Cruiser',
  },
];

const locations: Partial<Location>[] = [
  {
    ticker: 'JFK',
    longitude: 40.6413,
    latitude: -73.7781,
  },
  {
    ticker: 'SFO',
    longitude: 37.6213,
    latitude: -122.379,
  },
  {
    ticker: 'LAX',
    longitude: 33.9416,
    latitude: -118.4085,
  },
];

const run = async () => {
  console.log('Seeding database...');

  await appDataSource.initialize().then(async () => {
    for (const location of locations) {
      await appDataSource.getRepository(Location).save(location);
    }
    for (const spaceShip of spaceShips) {

      await appDataSource.getRepository(SpaceShip).save(spaceShip);
    }
  });
};

run();
