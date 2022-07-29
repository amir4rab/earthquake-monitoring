// utils
import getData from './getData';
import submitToDatabase from './submitToDatabase';

interface cronjobProps {
  verbose: boolean;
}
const cronjob = async ({ verbose= false }: cronjobProps) => {
  try {
    const data = await getData(verbose);
    if ( data === null ) return;

    const diff = await submitToDatabase(data);
    if ( verbose ) console.log(
      diff.length !== 0 ? `${diff.length} new items has been added to database! 🌱`: `No new items has been received`
    )
    if ( diff.length === 0 ) return; // returning incase there was no new data

    // here we should send data to next.js to regenerate pages


  } catch (err) {
    console.error(`⚠️ Error in "cronjob": `, err);
  }
}

export default cronjob;