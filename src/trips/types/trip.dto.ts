import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class TripDto {
  @ApiProperty({ example: 'SYD' })
  @IsString()
  origin: string;

  @ApiProperty({ example: 'GRU' })
  @IsString()
  destination: string;

  @ApiProperty({ example: 3141 })
  @IsNumber()
  cost: number;

  @ApiProperty({ example: 20 })
  @IsNumber()
  duration: number;

  @ApiProperty({ example: 'car' })
  @IsString()
  type: string;

  @ApiProperty({ example: 'e6438572-0e0f-49ab-88fc-b05bbbeff1e3' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'from SYD to GRU by car' })
  @IsString()
  display_name: string;
}
