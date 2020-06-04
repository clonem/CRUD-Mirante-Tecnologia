import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { UserTypeEnum } from '../enum/user-type.enum';
import { IUser } from '../interface/user.interface';

export class CreateUserDTO implements IUser {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email!: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  phone?: string;

  @ApiProperty({ enum: UserTypeEnum })
  @IsNotEmpty()
  @IsEnum(UserTypeEnum)
  userType!: UserTypeEnum;
}
