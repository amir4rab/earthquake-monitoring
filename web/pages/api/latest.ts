// types
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Earthquake } from '@prisma/client';

// database
import getLatestData from '@/utils/backend/getLatestData';

// cors
import Cors from 'cors';

// utils
import runMiddleware from '@/utils/backend/runMiddleware';

// cors
const cors = Cors({
  methods: ['GET'],
  origin: '*'
});

type Data = {
  err: string | null;
  data: Earthquake[] | null;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await runMiddleware(req, res, cors);

    if (req.method !== 'GET')
      return res.status(405).json({ err: 'Method not allowed', data: null });

    const data = await getLatestData();

    process.env.NODE_ENV === 'production' &&
      res.setHeader('Cache-Control', `public, s-maxage=1`);
    res.status(200).json({ err: null, data: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong', data: null });
  }
};

export default handler;
