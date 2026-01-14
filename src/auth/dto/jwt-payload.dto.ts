import { Role } from "src/users/user.entity";

export type JWTPayloadDTO = {
  sub: number;
  role: Role
  iat: number;
  exp: number;
}