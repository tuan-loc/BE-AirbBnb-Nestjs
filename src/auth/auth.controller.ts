import { MyJwtGuard } from 'src/auth/guard';
import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDTO, LoginAuthDTO } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() registerDTO: RegisterAuthDTO, @Req() req: Request) {
    // not validate using class validator
    return this.authService.register(registerDTO)
  }

  @Post('login')
  login(@Body() loginDTO: LoginAuthDTO) {
    return this.authService.login(loginDTO)
  }
}
