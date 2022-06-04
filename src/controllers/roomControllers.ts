import type { NextApiRequest, NextApiResponse } from 'next';

import db from '../db/db';
import { IRoomDto, IErrorDto, IAllRoomsDto } from '../db/interfaces';
import Room from '../db/models/Room';
import APIFeatures from '../utils/apiFeatures';
import IWithBodyNextApiRequest from './interfaces/IWithBodyNextApiRequest';

type RoomNextApiRequest = IWithBodyNextApiRequest<IRoomDto>;

const allRooms = async (req: NextApiRequest, res: NextApiResponse<IAllRoomsDto>): Promise<void> => {
  await db.connect();

  const resPerPage = 4;
  const roomsCount = await Room.countDocuments();

  const apiFeatures = new APIFeatures(Room.find(), req.query).search().filter();

  let rooms: IRoomDto[] = await apiFeatures.query.lean();
  const filteredRoomsCount = rooms.length;

  apiFeatures.pagination(resPerPage);
  rooms = await apiFeatures.query.clone().lean();

  await db.disconnect();
  res.status(200).send({
    roomsCount,
    resPerPage,
    filteredRoomsCount,
    rooms,
  });
};

// Create new room => /api/rooms
const newRoom = async (req: RoomNextApiRequest, res: NextApiResponse<IRoomDto>): Promise<void> => {
  await db.connect();
  const newRm = new Room({
    ...req.body,
  });
  const room = await newRm.save();
  await db.disconnect();
  res.status(201).send(room);
};

// Get room details => /api/rooms/:id
const getSingleRoom = async (req: NextApiRequest, res: NextApiResponse<IRoomDto | IErrorDto>): Promise<void> => {
  await db.connect();
  const room: IRoomDto = await Room.findById(req.query.id).lean();
  if (!room) {
    await db.disconnect();
    res.status(404).json({
      errormsg: 'Room not found with this ID',
      status: 404,
    });
    return;
  }
  await db.disconnect();
  res.status(200).send(room);
};

// Update room details => /api/rooms/:id
const updateRoom = async (req: RoomNextApiRequest, res: NextApiResponse<IRoomDto | IErrorDto>): Promise<void> => {
  await db.connect();
  const room = await Room.findById(req.query.id);
  if (!room) {
    await db.disconnect();
    res.status(404).json({
      errormsg: 'Room not found with this ID',
      status: 404,
    });
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
const deleteRoom = async (req: NextApiRequest, res: NextApiResponse<{ status: number } | IErrorDto>): Promise<void> => {
  await db.connect();
  const room = await Room.findById(req.query.id);
  if (!room) {
    await db.disconnect();
    res.status(404).json({
      errormsg: 'Room not found with this ID',
      status: 404,
    });
    return;
  }
  await room.remove();
  await db.disconnect();
  res.status(200).json({ status: 200 });
};

export { allRooms, newRoom, getSingleRoom, updateRoom, deleteRoom };
