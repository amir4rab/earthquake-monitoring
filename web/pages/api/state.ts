// types
import type { NextApiRequest, NextApiResponse } from 'next';
import type { GetStatesDataFromPostgresReturn } from '@/prisma';

// database
import getStateData from '@/utils/backend/getStateData';

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
  data: GetStatesDataFromPostgresReturn | null;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await runMiddleware(req, res, cors);

    if (req.method !== 'GET')
      return res.status(405).json({ err: 'Method not allowed', data: null });

    if (
      typeof req.query?.page !== 'string' ||
      typeof req.query?.state !== 'string'
    )
      return res.status(400).json({
        err: 'False parameters',
        data: null
      });
    const regExp = new RegExp(/^([0-9]+)$/);

    // verifying charset
    if (!regExp.test(req.query.page) || !regExp.test(req.query.state))
      return res.status(406).json({
        err: 'Parameters must be numbers',
        data: null
      });

    // parsing the inputs
    const { page, state } = {
      page: parseInt(req.query.page),
      state: parseInt(req.query.state)
    };

    // verifying range
    if (1 > page || page > 5 || 0 > state || page > 30)
      return res.status(416).json({
        err: 'page must be in range of 1 to 5 and state must be in range of 0 to 30',
        data: null
      });

    const data = await getStateData({ stateId: state + '', page: page - 1 });

    // setting cache header for production instance
    process.env.NODE_ENV === 'production' &&
      res.setHeader('Cache-Control', `public, s-maxage=1`);

    res.status(200).json({ err: null, data: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong', data: null });
  }
};

export default handler;
