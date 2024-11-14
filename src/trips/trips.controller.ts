import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { Trip, TripEntity } from './types';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  async getTrips(
    @Query('origin') origin: string,
    @Query('destination') destination: string,
    @Query('sort_by') sortBy: string,
  ): Promise<Trip[]> {
    if (!origin || !destination || !['fastest', 'cheapest'].includes(sortBy)) {
      throw new HttpException(
        'Invalid query parameters.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.tripsService.getTrips(origin, destination, sortBy);
  }

  @Post()
  async saveTrip(@Body() trip: TripEntity): Promise<{ message: string }> {
    await this.tripsService.saveTrip(trip);
    return { message: 'Trip saved successfully.' };
  }

  @Get('saved')
  async listTrips(): Promise<TripEntity[]> {
    return await this.tripsService.listTrips();
  }

  @Delete(':id')
  async deleteTrip(@Param('id') id: string): Promise<{ message: string }> {
    const deleted = await this.tripsService.deleteTrip(id);
    if (deleted) {
      return { message: 'Trip deleted successfully.' };
    } else {
      throw new HttpException('Trip not found.', HttpStatus.NOT_FOUND);
    }
  }
}
