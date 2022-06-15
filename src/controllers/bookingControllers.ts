import type { NextApiRequest, NextApiResponse } from 'next';

import * as Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

import db from '../db/db';
import { IBookingDto, IErrorDto } from '../db/interfaces';
import Booking from '../db/models/Booking';
import IWithBodyNextApiRequest from './interfaces/IWithBodyNextApiRequest';

type NewBookingNextApiRequest = IWithBodyNextApiRequest<IBookingDto>;

// Create new Booking => /api/bookings
const newBooking = async (
  req: NewBookingNextApiRequest,
  res: NextApiResponse<{ status: number; booking: IBookingDto } | IErrorDto>,
): Promise<void> => {
  await db.connect();

  const booking = await Booking.create({
    room: req.body.room,
    user: req.body.user,
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
    amountPaid: req.body.amountPaid,
    daysOfStay: req.body.daysOfStay,
    paymentInfo: req.body.paymentInfo,
    paidAt: Date.now(),
  });

  await db.disconnect();
  res.status(201).send({
    status: 201,
    booking: {
      _id: booking._id,
      room: booking.room,
      user: booking.user,
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      amountPaid: booking.amountPaid,
      daysOfStay: booking.daysOfStay,
      paymentInfo: booking.paymentInfo,
      paidAt: booking.paidAt,
    },
  });
};

// Check room booking availability   =>   /api/bookings/check?roomId=${id}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}
const checkRoomBookingAvailability = async (
  req: NextApiRequest,
  res: NextApiResponse<{ roomId: string; isAvailable: boolean } | IErrorDto>,
): Promise<void> => {
  const { checkInDate, checkOutDate } = req.query;

  await db.connect();

  const bookings = await Booking.find({
    room: req.query.roomId,
    $and: [
      {
        checkInDate: {
          $lte: parseInt(checkOutDate as string),
        },
      },
      {
        checkOutDate: {
          $gte: parseInt(checkInDate as string),
        },
      },
    ],
  });

  await db.disconnect();

  // Check if there is any booking available
  let isAvailable = false;

  if (bookings && bookings.length === 0) isAvailable = true;

  res.status(200).json({
    roomId: req.query.roomId as string,
    isAvailable,
  });
};

// Check booked dates of a room   =>   /api/bookings/check_booked_dates?roomId=${id}
const checkBookedDatesOfRoom = async (
  req: NextApiRequest,
  res: NextApiResponse<{ roomId: string; dates: number[] } | IErrorDto>,
): Promise<void> => {
  const { roomId } = req.query;

  await db.connect();

  const bookings = await Booking.find({ room: roomId });

  let bookedDates: number[] = [];

  bookings.forEach((booking) => {
    const range = moment.range(moment(booking.checkInDate), moment(booking.checkOutDate));

    const dates = Array.from(range.by('day')).map((m) => moment(m).valueOf() as number);
    bookedDates = bookedDates.concat(dates);
  });

  await db.disconnect();

  // res.status(200).send({ roomId: roomId as string, dates: [1655306666000, 1655606666000] });
  res.status(200).send({ roomId: roomId as string, dates: bookedDates });
};

export { newBooking, checkRoomBookingAvailability, checkBookedDatesOfRoom };
