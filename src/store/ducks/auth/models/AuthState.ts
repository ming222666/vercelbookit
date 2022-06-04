import { IUserDto, IErrorDto } from '../../../../db/interfaces';

export type AuthState = {
  user: IUserDto | null;
  loading: boolean;
  error: IErrorDto | null;
  success: true | null;
};
