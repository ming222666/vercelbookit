import { IRoomDto, ILES } from '../../../../../db/interfaces';

export interface RoomUpdateState extends ILES {
  room: IRoomDto | null;
}
