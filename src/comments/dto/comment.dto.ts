import { ApiProperty } from '@nestjs/swagger'

export class CommentsDTO {
  @ApiProperty({ type: Number, description: 'The ID of the comment' })
  id: number

  @ApiProperty({ type: Number, description: 'The ID of the user who created the comment' })
  user_id: number

  @ApiProperty({ type: Number, description: 'The ID of the room to which the comment is attached' })
  room_id: number

  @ApiProperty({ type: Date, description: 'The date and time when the comment was created' })
  date_comment: Date

  @ApiProperty({ type: String, description: 'The content of the comment' })
  content: string

  @ApiProperty({ type: Number, description: 'The rating given to the room by the user who created the comment' })
  rate: number
}
