// utils
import getData from './getData';
import submitToDatabase from './submitToDatabase';
import callNext from './callNext';

interface cronjobProps {
  verbose?: boolean;
  revalidateInDev?: boolean;
  skipCallingNext?: boolean;
}
const cronjob = async ({
  verbose = false,
  revalidateInDev = false,
  skipCallingNext = false
}: cronjobProps) => {
  try {
    const data = await getData(verbose);
    if (data === null) return;

    const diff = await submitToDatabase(data);
    if (verbose)
      console.log(
        diff.length !== 0
          ? `${diff.length} new items has been added to database! 🌱`
          : `No new items has been received`
      );
    if (diff.length === 0) return; // returning incase there was no new data

    // here we should send data to next.js to regenerate pages
    if (
      (process.env.NODE_ENV === 'production' || revalidateInDev) &&
      !skipCallingNext
    ) {
      const apiRoute = process.env.NEXT_JS_API_ROUTE;
      const apiKey = process.env.NEXT_JS_API_KEY;

      if (typeof apiRoute !== 'string' || typeof apiKey !== 'string') {
        throw new Error(
          'Please set following env files: "NEXT_JS_API_ROUTE", "NEXT_JS_API_KEY"!'
        );
      }

      await callNext({ apiKey, apiRoute, diff });
    }
  } catch (err) {
    console.error(`⚠️ Error in "cronjob": `, err);
  }
};

export default cronjob;
