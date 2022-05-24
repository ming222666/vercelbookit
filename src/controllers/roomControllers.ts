import type { NextApiRequest, NextApiResponse } from 'next';

import db from '../db/db';
import { IRoomDto } from '../db/interfaces';
import Room from '../db/models/Room';

interface ExtendedNextApiRequestNewRoom extends NextApiRequest {
  body: IRoomDto;
}

const allRooms = async (req: NextApiRequest, res: NextApiResponse<IRoomDto[]>): Promise<void> => {
  await db.connect();
  const rooms: IRoomDto[] = await Room.find().lean();
  await db.disconnect();
  res.send(rooms);
};

// Create new room => /api/rooms
const newRoom = async (req: ExtendedNextApiRequestNewRoom, res: NextApiResponse<IRoomDto>): Promise<void> => {
  await db.connect();
  const newRm = new Room({
    ...req.body,
  });
  const room: IRoomDto = await newRm.save();
  await db.disconnect();
  res.status(201).send(room);
};

export { allRooms, newRoom };
