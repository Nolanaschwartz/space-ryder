import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { LocationsModule } from './locations/locations.module';
import { DatabaseModule } from './database/database.module';
import { SpaceShipsModule } from './space-ships/space-ships.module';
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      introspection: true,
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({ includeCookies: true }),
      ],
    }),
    DatabaseModule,
    LocationsModule,
    SpaceShipsModule,
    TripsModule,
  ],
  providers: [],
})
export class AppModule {}
