/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger/dist'
export class Booking {
  @ApiProperty({ description: 'id', type: Number })
  id: number

  @ApiProperty({ description: 'room_id', type: Number })
  room_id: number

  @ApiProperty({ description: 'arrival_date', type: Date })
  arrival_date: Date

  @ApiProperty({ description: 'depart_date', type: Date })
  depart_date: Date

  @ApiProperty({ description: 'customer_quantity', type: Number })
  customer_quantity: number

  @ApiProperty({ description: 'user_id', type: Number })
  user_id: number
}
