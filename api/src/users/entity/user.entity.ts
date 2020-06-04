import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { DefaultBaseEntity } from '../../common/entity/default-base.entity';
import { UserTypeEnum } from '../enum/user-type.enum';
import { IUser } from '../interface/user.interface';

@Entity({ name: 'User' })
@Unique(['email'])
export class User extends DefaultBaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  userID?: number;

  @Column()
  name!: string;

  @Column({ length: 500, nullable: true })
  email!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({
    type: 'enum',
    enum: UserTypeEnum,
    default: UserTypeEnum.Customer,
  })
  userType!: UserTypeEnum;
}
