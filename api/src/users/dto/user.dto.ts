import { Expose, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { UserTypeEnum } from '../enum/user-type.enum';
import { IUser } from '../interface/user.interface';

export class UserDTO implements IUser {
  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsNumber()
  userID?: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email!: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @MaxLength(255)
  phone?: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  userType!: UserTypeEnum;
}
