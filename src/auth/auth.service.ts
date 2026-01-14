import { 
  Injectable, 
  NotFoundException, 
  UnauthorizedException 
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import { AccessTokenDTO } from './dto/access-token.dto';
import { JWTPayloadDTO } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(email: string, password: string): Promise<AccessTokenDTO> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }

    if (user.password !== password) {
      throw new UnauthorizedException();
    }

    const payload: Omit<JWTPayloadDTO, 'iat'|'exp'> = { 
      sub: user.id,
      role: user.role
    };

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
