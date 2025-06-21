import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() Body: Prisma.UserCreateInput) {
    return this.authService.signin(Body);
  }
}
