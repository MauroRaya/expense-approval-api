import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDTO } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async createUser(dto: CreateUserDTO): Promise<User> {
    const user = this.userRepository.create({
      name: dto.name,
      email: dto.email,
      role: dto.role
    });

    return await this.userRepository.save(user);
  }
}