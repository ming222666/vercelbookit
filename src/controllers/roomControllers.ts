import type { NextApiRequest, NextApiResponse } from 'next';

import db from '../db/db';
import { IRoomDto, IErrormsgStatusDto } from '../db/interfaces';
import Room from '../db/models/Room';

interface ExtendedNextApiRequestRoom extends NextApiRequest {
  body: IRoomDto;
}

const allRooms = async (req: NextApiRequest, res: NextApiResponse<IRoomDto[]>): Promise<void> => {
  await db.connect();
  const rooms: IRoomDto[] = await Room.find().lean();
  await db.disconnect();
  res.status(200).send(rooms);
};

// Create new room => /api/rooms
const newRoom = async (req: ExtendedNextApiRequestRoom, res: NextApiResponse<IRoomDto>): Promise<void> => {
  await db.connect();
  const newRm = new Room({
    ...req.body,
  });
  const room = await newRm.save();
  await db.disconnect();
  res.status(201).send(room);
};

// Get room details => /api/rooms/:id
const getSingleRoom = async (
  req: NextApiRequest,
  res: NextApiResponse<IRoomDto | IErrormsgStatusDto>,
): Promise<void> => {
  await db.connect();
  const room: IRoomDto = await Room.findById(req.query.id).lean();
  if (!room) {
    await db.disconnect();
    res.status(404).json({ errormsg: 'Room not found with this ID', status: 404 });
    return;
  }
  await db.disconnect();
  res.status(200).send(room);
};

// Update room details => /api/rooms/:id
const updateRoom = async (
  req: ExtendedNextApiRequestRoom,
  res: NextApiResponse<IRoomDto | IErrormsgStatusDto>,
): Promise<void> => {
  await db.connect();
  const room = await Room.findById(req.query.id);
  if (!room) {
    await db.disconnect();
    res.status(404).json({ errormsg: 'Room not found with this ID', status: 404 });
    return;
  }
  const roomToUpdate: IRoomDto = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }).lean();
  await db.disconnect();
  res.status(200).send(roomToUpdate);
};

// Delete room => /api/rooms/:id
const deleteRoom = async (
  req: NextApiRequest,
  res: NextApiResponse<{ status: number } | IErrormsgStatusDto>,
): Promise<void> => {
  await db.connect();
  const room = await Room.findById(req.query.id);
  if (!room) {
    await db.disconnect();
    res.status(404).json({ errormsg: 'Room not found with this ID', status: 404 });
    return;
  }
  await room.remove();
  await db.disconnect();
  res.status(200).json({ status: 200 });
};

export { allRooms, newRoom, getSingleRoom, updateRoom, deleteRoom };
