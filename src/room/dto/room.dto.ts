/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger/dist'
export class RoomDTO {
  @ApiProperty({ description: 'user_id', type: Number })
  id?: number

  @ApiProperty({ description: 'room_name', type: String })
  room_name: string

  @ApiProperty({ description: 'max_customer', type: String })
  max_customer: string

  @ApiProperty({ description: 'bed', type: String })
  bed: string

  @ApiProperty({ description: 'bedroom', type: String })
  bedroom: string

  @ApiProperty({ description: 'bathroom', type: String })
  bathroom: string

  @ApiProperty({ description: 'description', type: String })
  description: string

  @ApiProperty({ description: 'price', type: String })
  price: string

  @ApiProperty({ description: 'washing_machine', type: Boolean })
  washing_machine: boolean

  @ApiProperty({ description: 'iron', type: Boolean })
  iron: boolean

  @ApiProperty({ description: 'tivi', type: Boolean })
  tivi: boolean

  @ApiProperty({ description: 'air_conditioner', type: Boolean })
  air_conditioner: boolean

  @ApiProperty({ description: 'wifi', type: Boolean })
  wifi: boolean

  @ApiProperty({ description: 'kitchen', type: Boolean })
  kitchen: boolean

  @ApiProperty({ description: 'parking', type: Boolean })
  parking: boolean

  @ApiProperty({ description: 'pool', type: Boolean })
  pool: boolean

  @ApiProperty({ description: 'laundry', type: Boolean })
  laundry: boolean

  @ApiProperty({ description: 'image', type: String })
  image: string

  @ApiProperty({ description: 'location_id', type: Number })
  location_id: number
}
