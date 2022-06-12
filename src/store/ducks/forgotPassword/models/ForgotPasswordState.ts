import { IErrorDto } from '../../../../db/interfaces';

export type ForgotPasswordState = {
  loading: boolean;
  error: IErrorDto | null;
  success: true | null;
};
