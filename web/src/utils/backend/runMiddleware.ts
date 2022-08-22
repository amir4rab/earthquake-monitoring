/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';

type Fn = (
  req: NextApiRequest,
  res: NextApiResponse,
  callback: (result: any) => any
) => void;

const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: Fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
};

export default runMiddleware;
