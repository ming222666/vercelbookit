import { IRoomDto, IErrorDto } from '../../../../db/interfaces';

export type RoomDetailsState = {
  room: IRoomDto | null;
  loading: boolean;
  error: IErrorDto | null;
  success: true | null;
};
