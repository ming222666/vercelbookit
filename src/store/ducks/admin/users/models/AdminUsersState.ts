import { IUserDto, ILES } from '../../../../../db/interfaces';

export interface AdminUsersState extends ILES {
  users: IUserDto[];
}
