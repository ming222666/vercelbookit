import { IErrorDto } from '../../../../../db/interfaces';

export type BookedDatesState = {
  roomId: string;
  dates: number[];
  loading: boolean;
  error: IErrorDto | null;
  success: true | null;
};
