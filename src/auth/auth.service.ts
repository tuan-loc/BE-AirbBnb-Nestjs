import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ForbiddenException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { RegisterAuthDTO, LoginAuthDTO } from './dto/auth.dto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async register(registerDTO: RegisterAuthDTO) {
    try {
      const hashedPassword = await bcrypt.hash(registerDTO.password, 10)
      console.log(hashedPassword)
      const dataImport = await this.prismaService.user.create({
        data: {
          name: registerDTO.name,
          email: registerDTO.email,
          password: hashedPassword,
          gender: registerDTO.gender,
          phone: registerDTO.phone,
          birthday: new Date(registerDTO.birthday),
          role: 'Customer'
        },
        select: {
          id: true,
          email: true,
          password: true,
          gender: true
        }
      })
      return dataImport
    } catch (error) {
      console.log(error)

      if (error.code === 'P2002') {
        throw new ForbiddenException('Email is already registered')
      }
    }
  }

  async login(loginDTO: LoginAuthDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: loginDTO.email
      }
    })

    if (!user) {
      throw new ForbiddenException('User not found')
    }

    const passwordMatched = await bcrypt.compare(loginDTO.password, user.password)

    if (!passwordMatched) {
      throw new ForbiddenException('Incorrect password')
    }

    return await this.signJwtToken(user.id, user.email)
  }

  async signJwtToken(userId: number, email: string) {
    const payload = { sub: userId, email }

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '60m',
      secret: this.configService.get('JWT_SECRET')
    })
    return { accessToken }
  }
}
