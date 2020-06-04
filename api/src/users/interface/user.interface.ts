import { UserTypeEnum } from '../enum/user-type.enum';

export interface IUser {
  name: string;
  email: string;
  userType: UserTypeEnum;
}
