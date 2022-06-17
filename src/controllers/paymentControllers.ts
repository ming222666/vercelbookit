import type { NextApiRequest, NextApiResponse } from 'next';

import absoluteUrl from 'next-absolute-url';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

import db from '../db/db';
import { IRoomDto, IErrorDto, IAllRoomsDto } from '../db/interfaces';
import Room from '../db/models/Room';
import User from '../db/models/User';
import Booking from '../db/models/Booking';

// Generate stripe checkout session  =>  /api/checkout_session/:roomId
const stripeCheckoutSession = async (req: NextApiRequest, res: NextApiResponse<IAllRoomsDto>): Promise<void> => {
  await db.connect();

  // Get room details
  const room = await Room.findById(req.query.roomId);

  const { checkInDate, checkOutDate, daysOfStay } = req.query;

  // Get origin
  const { origin } = absoluteUrl(req);

  // Get stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${origin}/bookings/me`,
    cancel_url: `${origin}/rooms/${room._id}`,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customer_email: (req as any).user.email,
    client_reference_id: req.query.roomId,
    metadata: { checkInDate, checkOutDate, daysOfStay },
    line_items: [
      {
        name: room.name,
        images: [`${room.images[0].url}`],
        amount: parseFloat(req.query.amount as string) * 100,
        currency: 'usd',
        quantity: 1,
      },
    ],
  });

  res.status(200).json(session);
};

export { stripeCheckoutSession };
