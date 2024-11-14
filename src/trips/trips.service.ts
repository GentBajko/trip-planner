import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { Trip, TripEntity } from './types';

@Injectable()
export class TripsService {
  private readonly logger = new Logger(TripsService.name);
  private readonly TRIPS_API_URL =
    'https://z0qw1e7jpd.execute-api.eu-west-1.amazonaws.com/default/trips';
  private savedTrips: Trip[] = [];

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(TripEntity)
    private tripRepository: Repository<Trip>,
  ) {}

  async getTrips(
    origin: string,
    destination: string,
    sortBy: string,
  ): Promise<Trip[]> {
    try {
      const apiKey = this.configService.get<string>('API_KEY');

      const response = await axios.get<Trip[]>(this.TRIPS_API_URL, {
        headers: { 'x-api-key': apiKey },
        params: {
          origin,
          destination,
        },
      });

      const trips = response.data;

      if (sortBy === 'fastest') {
        trips.sort((a, b) => a.duration - b.duration);
      } else if (sortBy === 'cheapest') {
        trips.sort((a, b) => a.cost - b.cost);
      }

      return trips;
    } catch (error) {
      const statusCode =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message = error.response?.data || error.message;
      throw new HttpException(`Failed to fetch trips: ${message}`, statusCode);
    }
  }

  async saveTrip(trip: Trip): Promise<Trip> {
    return await this.tripRepository.save(trip);
  }

  async listTrips(): Promise<Trip[]> {
    return await this.tripRepository.find();
  }

  async deleteTrip(id: string): Promise<boolean> {
    const result = await this.tripRepository.delete(id);
    return result.affected > 0;
  }
}
