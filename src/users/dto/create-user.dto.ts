import { Role } from "../user.entity";

export interface CreateUserDTO {
  name: string;
  email: string;
  role: Role;
}