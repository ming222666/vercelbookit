import type { NextApiRequest, NextApiResponse } from 'next';

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

// Check booked dates of a room   =>   /api/bookings/check_booked_dates?roomId=${id}
const checkBookedDatesOfRoom = async (
  req: NextApiRequest,
  res: NextApiResponse<{ roomId: string; dates: number[] } | IErrorDto>,
): Promise<void> => {
  const { roomId } = req.query;

  // eslint-disable-next-line no-console
  console.log('bookingControllers checkBookedDatesOfRoom roomId', roomId);
  res.status(200).send({ roomId: roomId as string, dates: [1655306666000, 1655606666000] });
};

export { newBooking, checkBookedDatesOfRoom };
