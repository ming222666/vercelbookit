import { IAllRoomsDto } from '../../../../db/interfaces';
import { IErrorDto } from '../../../../db/interfaces';

export interface AllRoomsState extends IAllRoomsDto {
  loading: boolean;
  error: IErrorDto | null;
  success: true | null;
}
