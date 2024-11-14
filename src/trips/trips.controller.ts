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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TripsService } from './trips.service';
import { TripDto, TripEntity } from './types';

@ApiTags('trips')
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all trips' })
  @ApiResponse({
    status: 200,
    description: 'List of trips retrieved successfully.',
    type: [TripDto],
  })
  async getTrips(
    @Query('origin') origin: string,
    @Query('destination') destination: string,
    @Query('sort_by') sortBy: string,
  ): Promise<TripDto[]> {
    if (!origin || !destination || !['fastest', 'cheapest'].includes(sortBy)) {
      throw new HttpException(
        'Invalid query parameters.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.tripsService.getTrips(origin, destination, sortBy);
  }

  @Post()
  @ApiOperation({ summary: 'Save a new trip' })
  @ApiResponse({
    status: 201,
    description: 'Trip saved successfully.',
    type: Object,
  })
  async saveTrip(@Body() trip: TripEntity): Promise<{ message: string }> {
    await this.tripsService.saveTrip(trip);
    return { message: 'Trip saved successfully.' };
  }

  @Get('saved')
  @ApiOperation({ summary: 'List saved trips' })
  @ApiResponse({
    status: 200,
    description: 'List of saved trips retrieved successfully.',
    type: [TripEntity],
  })
  async listTrips(): Promise<TripEntity[]> {
    return await this.tripsService.listTrips();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a trip' })
  @ApiResponse({
    status: 200,
    description: 'Trip deleted successfully.',
    type: Object,
  })
  @ApiResponse({
    status: 404,
    description: 'Trip not found.',
    type: Object,
  })
  async deleteTrip(@Param('id') id: string): Promise<{ message: string }> {
    const deleted = await this.tripsService.deleteTrip(id);
    if (deleted) {
      return { message: 'Trip deleted successfully.' };
    } else {
      throw new HttpException('Trip not found.', HttpStatus.NOT_FOUND);
    }
  }
}
