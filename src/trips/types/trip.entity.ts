import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class TripEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column('float')
  cost: number;

  @Column('float')
  duration: number;

  @Column()
  type: string;

  @Column()
  display_name: string;
}
