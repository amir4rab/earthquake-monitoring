// utils
import getData from './getData';
import submitToDatabase from './submitToDatabase';

const cronjob = async () => {
  try {
    const data = await getData();
    if ( data === null ) return;

    const diff = await submitToDatabase(data);
    if ( diff.length === 0 ) return; // returning incase there was no new data

    // here we should send data to next.js to regenerate pages


  } catch (err) {
    console.error(`Error in "cronjob": `, err);
  }
}

export default cronjob;