import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { Repository } from 'typeorm';
import { TripsService } from './trips.service';
import { Trip } from './types';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { TripEntity } from './types';

jest.mock('axios');

describe('TripsService', () => {
  let service: TripsService;
  let repository: Repository<Trip>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripsService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('mock-api-key'),
          },
        },
        {
          provide: getRepositoryToken(TripEntity),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TripsService>(TripsService);
    repository = module.get<Repository<Trip>>(getRepositoryToken(TripEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTrips', () => {
    it('should return sorted trips', async () => {
      const trips: Trip[] = [
        {
          origin: 'SYD',
          destination: 'GRU',
          cost: 700,
          duration: 10,
          type: 'flight',
          id: '1',
          display_name: 'Trip 1',
        },
        {
          origin: 'SYD',
          destination: 'GRU',
          cost: 600,
          duration: 8,
          type: 'flight',
          id: '2',
          display_name: 'Trip 2',
        },
      ];

      (axios.get as jest.Mock).mockResolvedValue({ data: trips });

      const result = await service.getTrips('SYD', 'GRU', 'cheapest');
      expect(result[0].id).toBe('2');
    });
  });

  describe('deleteTrip', () => {
    it('should delete a trip', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);

      expect(await service.deleteTrip('1')).toBe(true);
    });

    it('should return false if trip not found', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 0 } as any);

      expect(await service.deleteTrip('2')).toBe(false);
    });
  });
});
