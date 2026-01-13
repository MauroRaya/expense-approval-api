import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { SignInDTO } from './dto/sign-in.dto';
import { AccessTokenDTO } from './dto/access-token.dto';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() dto: SignInDTO): Promise<AccessTokenDTO> {
    return await this.authService.signIn(dto.email, dto.password);
  }
}
