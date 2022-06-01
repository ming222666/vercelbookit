import { IAllRoomsDto } from '../../../../db/interfaces';
import { IErrormsgStatusDto } from '../../../../db/interfaces';

export interface AllRoomsState extends IAllRoomsDto {
  error: IErrormsgStatusDto | null;
}
