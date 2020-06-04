import { plainToClass } from 'class-transformer';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserDTO } from './dto/user.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async findAll(): Promise<UserDTO[]> {
    const users = await this.userRepository.find();

    return plainToClass(UserDTO, users, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(userID: number): Promise<UserDTO> {
    const currentUser = await this.userRepository.findOne(userID);

    if (!currentUser) {
      throw new NotFoundException(`User not found!`);
    }

    return plainToClass(UserDTO, currentUser, {
      excludeExtraneousValues: true,
    });
  }

  async delete(userID: number): Promise<void> {
    const deleteResult = await this.userRepository.delete(userID);

    if (!deleteResult.affected) {
      throw new NotFoundException(`User not found!`);
    }

    return;
  }

  async update(userID: number, user: UserDTO): Promise<UserDTO> {
    const currentUser = await this.userRepository.findOne(userID);

    if (!currentUser) {
      throw new NotFoundException(`User not found!`);
    }

    const userUpdated = this.userRepository.merge(currentUser, {
      name: user.name,
      userType: user.userType,
      phone: user.phone,
    });

    await this.userRepository.save(userUpdated);

    return plainToClass(UserDTO, userUpdated, {
      excludeExtraneousValues: true,
    });
  }

  async save(user: UserDTO): Promise<UserDTO> {
    const userCreated = this.userRepository.create({
      ...user,
    });

    await this.userRepository.save(userCreated);

    return plainToClass(UserDTO, userCreated, {
      excludeExtraneousValues: true,
    });
  }
}
