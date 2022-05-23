// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function e(): void {
  // eslint-disable-next-line no-console
  console.log(123);
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}
