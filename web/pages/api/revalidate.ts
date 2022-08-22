// types
import type { NextApiRequest, NextApiResponse } from 'next';

// ajv
import Ajv, { JSONSchemaType } from 'ajv';

// backend-utils
import getLatestData from '@/utils/backend/getLatestData';
import getStatesData from '@/utils/backend/getStateData';

import i18nConfig from 'i18n';

interface RevalidatePayload {
  latest?: true;
  states?: number[];
}

const revalidatePayloadSchema: JSONSchemaType<RevalidatePayload> = {
  type: 'object',
  required: [],
  properties: {
    latest: {
      type: 'boolean',
      nullable: true
    },
    states: {
      type: 'array',
      nullable: true,
      minItems: 1,
      items: {
        type: 'integer',
        minimum: 0,
        maximum: 30
      }
    }
  },
  additionalProperties: false
};

type Data = {
  err: string | null;
  successful: boolean;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const startTime = performance.now();
  try {
    if (req.method !== 'POST')
      return res
        .status(405)
        .json({ err: 'Method not allowed', successful: true });

    const apiKey = process.env.API_REVALIDATE_KEY;
    if (typeof apiKey !== 'string')
      return res
        .status(500)
        .json({ err: 'Invalid api key on server', successful: false });

    if (apiKey !== req.headers['x-api-key'])
      return res.status(401).json({ err: 'Unauthorized', successful: false });

    const ajv = new Ajv();
    const validate = ajv.compile(revalidatePayloadSchema);

    const { body } = req;
    const isValid = validate(body);

    if (!isValid)
      return res.status(400).json({
        err: 'False parameters',
        successful: false
      });

    // incase revalidate payload includes revalidating latest data
    if (body?.latest === true) {
      console.log('Revalidating latest pages 🏭');

      await getLatestData(true);

      const locales = i18nConfig.locales as string[];

      await res.revalidate(`/`);
      await res.revalidate(`/nearme`);

      for (const locale of locales) {
        await res.revalidate(`/${locale}`);
        await res.revalidate(`/${locale}/nearme`);
      }
    }

    if (typeof body?.states !== 'undefined' && Array.isArray(body?.states))
      for (const state of body.states) {
        const stateStr = (state + '').replace(/\n|\r/g, '');

        console.log('Revalidating state with id of ' + stateStr + ' 🏭');
        await getStatesData({
          page: 0,
          stateId: stateStr + '',
          skipCache: true
        });
      }

    res.status(200).json({ err: null, successful: true });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ err: 'Something went wrong on next.js', successful: false });
  } finally {
    console.log(
      `Revalidating pages took ${(performance.now() - startTime).toFixed(
        0
      )}ms ⏱️`
    );
  }
};

export default handler;
