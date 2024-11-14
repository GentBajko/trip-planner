import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TripEntity } from 'src/trips/types';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { AppModule } from './../src/app.module';
import { TripsService } from './../src/trips/trips.service';

describe('TripsController (e2e)', () => {
  let app: INestApplication;
  const tripsService = { getTrips: () => ['test'] };
  let repository: Repository<TripEntity>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TripsService)
      .useValue(tripsService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/trips (GET)', () => {
    return request(app.getHttpServer())
      .get('/trips?origin=SYD&destination=GRU&sort_by=cheapest')
      .expect(200)
      .expect(['test']);
  });

  afterEach(async () => {
    await repository.query('DELETE FROM trip;');
  });

  it('/trips/saved (GET)', () => {
    return request(app.getHttpServer())
      .get('/trips/saved')
      .expect(200)
      .expect([]);
  });

  it('/trips (POST)', () => {
    const trip = {
      id: '1',
      origin: 'SYD',
      destination: 'GRU',
      cost: 600,
      duration: 8,
      type: 'flight',
      display_name: 'Trip 1',
    };

    return request(app.getHttpServer())
      .post('/trips')
      .send(trip)
      .expect(201)
      .expect({ message: 'Trip saved successfully.' });
  });

  afterAll(async () => {
    await app.close();
  });
});
