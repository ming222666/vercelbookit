import { IRoomDto, IErrormsgStatusDto } from '../../../../db/interfaces';

export type AllRoomsState = {
  rooms: IRoomDto[];
  error: IErrormsgStatusDto | null;
};
