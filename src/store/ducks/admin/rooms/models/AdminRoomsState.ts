import { IRoomDto, ILES } from '../../../../../db/interfaces';

export interface AdminRoomsState extends ILES {
  rooms: IRoomDto[];
}
