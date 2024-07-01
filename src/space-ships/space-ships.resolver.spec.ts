import { Test, TestingModule } from '@nestjs/testing';
import { SpaceShipsResolver } from './space-ships.resolver';

describe('SpaceShipsResolver', () => {
  let resolver: SpaceShipsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpaceShipsResolver],
    }).compile();

    resolver = module.get<SpaceShipsResolver>(SpaceShipsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
