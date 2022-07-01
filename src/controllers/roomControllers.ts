import type { NextApiRequest, NextApiResponse } from 'next';

import { v2 as cloudinary } from 'cloudinary';

import db from '../db/db';
import { IRoomDto, IErrorDto, IAllRoomsDto, IRoomWithImagesBase64Dto } from '../db/interfaces';
import Room from '../db/models/Room';
import Booking from '../db/models/Booking';
import APIFeatures from '../utils/apiFeatures';
import convertDocsToObj from '../utils/convertDocsToObj';
import { IWithBodyNextApiRequest } from './interfaces';

type RoomNextApiRequest = IWithBodyNextApiRequest<IRoomWithImagesBase64Dto>;

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
  const images = req.body.imagesBase64;

  const imagesLinks: {
    public_id: string;
    url: string;
  }[] = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: 'bookit/rooms',
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req.body.user = (req as any).user._id;

  await db.connect();

  const room = await Room.create(req.body);

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

  const images = req.body.imagesBase64;

  if (images && images.length > 0) {
    // Delete images associated with the room
    for (let i = 0; i < room.images.length; i++) {
      await cloudinary.uploader.destroy(room.images[i].public_id);
    }

    const imagesLinks: {
      public_id: string;
      url: string;
    }[] = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: 'bookit/rooms',
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req.body.user = (req as any).user._id;

  const changesToUpdate = req.body;
  changesToUpdate['updatedAt'] = Date.now();

  const roomToUpdate: IRoomDto = await Room.findByIdAndUpdate(req.query.id, changesToUpdate, {
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
  res: NextApiResponse<{ success: boolean } | IErrorDto>,
): Promise<void> => {
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

  // Delete images associated with the room
  for (let i = 0; i < room.images.length; i++) {
    await cloudinary.uploader.destroy(room.images[i].public_id);
  }

  await room.remove();
  await db.disconnect();
  res.status(200).json({ success: true });
};

interface IReviewDto {
  _id?: string;
  user?: string;
  name?: string;
  roomId: string;
  rating: number;
  comment: string;
}

// Create a new room review => /api/reviews
const createRoomReview = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { rating, comment, roomId } = req.body;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = (req as any).user._id;

  const review: IReviewDto = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: (req as any).user.name,
    roomId,
    rating: Number(rating),
    comment,
  };

  await db.connect();
  const room = await Room.findById(roomId);

  const isReviewed = room.reviews.find((r: IReviewDto) => r.user?.toString() === user);

  if (isReviewed) {
    room.reviews.forEach((r: IReviewDto) => {
      if (r.user?.toString() === user) {
        r.comment = comment;
        r.rating = rating;
      }
    });
  } else {
    room.reviews.push(review);
    room.numOfReviews = room.reviews.length;
  }

  room.rating = room.reviews.reduce((acc: number, r: IReviewDto) => r.rating + acc, 0) / room.reviews.length;

  await room.save({ validateBeforeSafe: false });

  await db.disconnect();
  res.status(200).send({});
};

// Check Review Availability   =>   /api/reviews/check_review_availability
const checkReviewAvailability = async (req: NextApiRequest, res: NextApiResponse<boolean>): Promise<void> => {
  const { roomId } = req.query;

  await db.connect();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookings = await Booking.find({ user: (req as any).user._id, room: roomId });

  await db.disconnect();

  let isReviewAvailable = false;
  if (bookings.length > 0) isReviewAvailable = true;

  res.status(200).send(isReviewAvailable);
};

// Get all rooms - ADMIN   =>   /api/admin/rooms
const allAdminRooms = async (req: NextApiRequest, res: NextApiResponse<IRoomDto[]>): Promise<void> => {
  await db.connect();
  const sortBy = req.query.updated ? { updatedAt: -1 } : { name: 1 };
  const rooms: IRoomDto[] = await Room.find().sort(sortBy).lean();
  convertDocsToObj(rooms);
  await db.disconnect();

  res.status(200).send(rooms);
};

export {
  allRooms,
  newRoom,
  getSingleRoom,
  updateRoom,
  deleteRoom,
  createRoomReview,
  checkReviewAvailability,
  allAdminRooms,
};
