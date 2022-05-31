import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Room from '../../db/models/Room';
import db from '../../db/db';
import data from '../../db/seeddataRooms.json';
import { onError, onNoMatch } from '../../utils/onError';

const handler = nc({ onError, onNoMatch });

const doSeed = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await db.connect();
  await Room.deleteMany();
  await Room.insertMany(data);
  await db.disconnect();
  const status = 201;

  res.status(status).send({ message: 'seeded successfully', status });
};

handler.get(doSeed);

export default handler;
