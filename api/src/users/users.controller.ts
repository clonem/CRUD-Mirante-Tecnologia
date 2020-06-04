import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { ErrorResponseDTO } from '../common/dto/error-response.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserDTO } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOkResponse({
    type: UserDTO,
    isArray: true,
    description: 'Retrieve user list.',
  })
  @Get()
  async findAll(): Promise<UserDTO[]> {
    return this.userService.findAll();
  }

  @ApiOkResponse({ type: UserDTO, description: 'Retrieve user details.' })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @Get(':user_id')
  async findOne(@Param('user_id') userID: string): Promise<UserDTO> {
    // if (userID === 'me') {
    //   return userLogged;
    // } else {
    return this.userService.findOne(Number(userID));
    // }
  }

  @ApiCreatedResponse({ type: UserDTO, description: 'Create user.' })
  @ApiBadRequestResponse({ type: ErrorResponseDTO })
  @Post()
  async create(@Body() user: CreateUserDTO): Promise<UserDTO> {
    return this.userService.save(user);
  }

  @ApiOkResponse({ type: UserDTO, description: 'Update user.' })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @ApiBadRequestResponse({ type: ErrorResponseDTO })
  @Put(':user_id')
  async update(
    @Param('user_id', ParseIntPipe) userID: number,
    @Body() user: CreateUserDTO,
  ): Promise<UserDTO> {
    return this.userService.update(userID, user);
  }

  @ApiOkResponse({ type: UserDTO, description: 'Delete user.' })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @Delete(':user_id')
  remove(@Param('user_id', ParseIntPipe) userID: number) {
    return this.userService.delete(userID);
  }
}
