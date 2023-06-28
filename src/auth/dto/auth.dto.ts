import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsIn,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist'
export class RegisterAuthDTO {
  @ApiProperty({ description: 'email', type: String })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({ description: 'password', type: String })
  @IsNotEmpty()
  @IsString()
  password: string

  @ApiProperty({ description: 'name', type: String })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ description: 'gender', type: String, enum: ['Male', 'Female', 'Other'] })
  @IsNotEmpty()
  @IsString()
  @IsIn(['Male', 'Female', 'Other'])
  gender: string

  @ApiProperty({ description: 'phone number', type: String })
  @IsNotEmpty()
  @IsString()
  phone: string

  @ApiProperty({ description: 'birthday', type: Date })
  @IsNotEmpty()
  birthday: Date
}

export class LoginAuthDTO {
  @ApiProperty({ description: 'email', type: String })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({ description: 'password', type: String })
  @IsNotEmpty()
  @IsString()
  password: string
}
