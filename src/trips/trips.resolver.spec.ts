import { Test, TestingModule } from '@nestjs/testing';
import { TripsResolver } from './trips.resolver';

describe('TripsResolver', () => {
  let resolver: TripsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripsResolver],
    }).compile();

    resolver = module.get<TripsResolver>(TripsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
