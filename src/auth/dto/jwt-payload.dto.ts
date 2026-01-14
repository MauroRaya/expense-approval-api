import { Role } from "src/users/user.entity";

export type JWTPayload = {
  sub: number;
  role: Role
  iat: number;
  exp: number;
}