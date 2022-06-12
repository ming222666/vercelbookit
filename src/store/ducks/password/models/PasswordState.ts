import { IErrorDto } from '../../../../db/interfaces';

export type PasswordState = {
  loading: boolean;
  error: IErrorDto | null;
  success: true | null;
  actionType: 'FORGOT_PASSWORD' | 'RESET_PASSWORD' | 'FORGOT_PASSWORD|RESET_PASSWORD';
};
