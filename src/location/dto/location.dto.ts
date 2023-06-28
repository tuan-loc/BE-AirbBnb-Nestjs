import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger/dist'
export class UpdateLocationDTO {
  @ApiProperty({ description: 'location_name', type: String })
  @IsNotEmpty()
  location_name: string

  @ApiProperty({ description: 'province', type: String })
  @IsNotEmpty()
  province: string

  @ApiProperty({ description: 'nation', type: String })
  @IsNotEmpty()
  nation: string

  @ApiProperty({ description: 'image', type: String })
  @IsNotEmpty()
  image: string
}

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any
}
