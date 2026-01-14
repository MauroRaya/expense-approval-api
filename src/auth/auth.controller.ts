import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { SignInDTO } from './dto/sign-in.dto';
import { AccessTokenDTO } from './dto/access-token.dto';
import { AuthGuard } from './auth.guard';
import type { Request } from 'express';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() dto: SignInDTO): Promise<AccessTokenDTO> {
    return await this.authService.signIn(dto.email, dto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() request: Request) {
    return request['user'];
  }
}
