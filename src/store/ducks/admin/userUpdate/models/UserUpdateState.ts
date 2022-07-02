import { ILES } from '../../../../../db/interfaces';

import { UserUpdateInfo } from './UserUpdateInfo';

export interface UserUpdateState extends ILES {
  user: UserUpdateInfo | null;
}
