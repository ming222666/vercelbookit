import type { NextApiRequest } from 'next';

export interface IWithBodyNextApiRequest<B> extends NextApiRequest {
  body: B;
}
