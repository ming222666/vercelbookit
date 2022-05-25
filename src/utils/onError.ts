import { NextApiResponse } from 'next';

import db from '../db/db';
import { IErrormsgStatusDto } from '../db/interfaces';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export async function onError(err: any, req: any, res: NextApiResponse<IErrormsgStatusDto>, next: any): Promise<void> {
  await db.disconnect();
  /* eslint-disable no-console */
  console.log('onError->errormsg', err.message);
  console.log('onError->err.name', err.name);
  // console.log('onError->err', err);
  console.log('onError->req.url', req.url);
  console.log('onError->req.method', req.method);
  console.log('onError->req.body', req.body);
  /* eslint-enable no-console */

  if (err.name !== 'CastError') {
    res.status(500).send({ errormsg: err.message, status: 500 });
  } else {
    res.status(400).send({ errormsg: `Resource not found. Invalid: ${err.path}`, status: 400 });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function onNoMatch(req: any, res: NextApiResponse<IErrormsgStatusDto>): void {
  const errormsg = `Method '${req.method}' Not Allowed`;

  /* eslint-disable no-console */
  console.log('onNoMatch->errormsg', errormsg);
  console.log('onNoMatch->req.url', req.url);
  console.log('onNoMatch->req.method', req.method);
  /* eslint-enable no-console */

  const status = 405;
  res.status(status).send({ errormsg, status });
}
