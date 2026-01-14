import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { SignInDTO } from './dto/sign-in.dto';
import { AccessTokenDTO } from './dto/access-token.dto';
import type { Request } from 'express';
import { Public } from 'src/public.decorator';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async signIn(@Body() dto: SignInDTO): Promise<AccessTokenDTO> {
    return await this.authService.signIn(dto.email, dto.password);
  }

  @Get('profile')
  async getProfile(@Req() request: Request) {
    return request['user'];
  }
}
