import { IRoomDto, ILES } from '../../../../../db/interfaces';

export interface RoomCreateUpdateState extends ILES {
  room: IRoomDto | null;
}
