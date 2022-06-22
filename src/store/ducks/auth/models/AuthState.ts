import { IUserDto, IErrorDto } from '../../../../db/interfaces';

export type AuthState = {
  user: IUserDto | null;
  loading: boolean; // load user
  error: IErrorDto | null;
  success: true | null;
  userUpdate: {
    loading: boolean; // update user
    error: IErrorDto | null;
    success: true | null;
  };
};
