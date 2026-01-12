import { Body, Controller, Post } from "@nestjs/common";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import type { CreateUserDTO } from "./dto/create-user.dto";

@Controller({ path: 'user' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDTO): Promise<User> {
    return await this.userService.createUser(dto);
  }
}