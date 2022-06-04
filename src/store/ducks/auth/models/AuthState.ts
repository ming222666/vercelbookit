import { IUserDto, IErrormsgStatusDto } from '../../../../db/interfaces';

export type AuthState = {
  loading: boolean;
  user: IUserDto | null;
  error: IErrormsgStatusDto | null;
  success: true | null;
};
