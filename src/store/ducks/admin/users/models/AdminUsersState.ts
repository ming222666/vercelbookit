import { ILES } from '../../../../../db/interfaces';
import { UserDetailsInfo } from '../../userDetails/models/UserDetailsInfo';

export interface AdminUsersState extends ILES {
  users: UserDetailsInfo[];
}
