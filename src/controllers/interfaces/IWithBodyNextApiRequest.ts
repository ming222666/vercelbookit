import type { NextApiRequest } from 'next';

export default interface IWithBodyNextApiRequest<B> extends NextApiRequest {
  body: B;
}
