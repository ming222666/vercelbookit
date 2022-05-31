import { IRoomDto, IErrormsgStatusDto } from '../../../../db/interfaces';

export type RoomDetailsState = {
  room: IRoomDto | null;
  error: IErrormsgStatusDto | null;
};
