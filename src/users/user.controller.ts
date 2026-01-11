import { Body, Controller, Post } from "@nestjs/common";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller({ path: 'user' })
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return await this.userService.createUser(user);
  }
}