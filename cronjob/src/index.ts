// settings up env files
import dotenv from 'dotenv';

// utils
import cronjob from './utils/cronjob';

dotenv.config();

const date = new Date();
console.log(`Started cronjob server at ${date.toLocaleDateString('de')} ${date.toLocaleTimeString('de')}. ⚡`);

setInterval(() => {
  const date = new Date();
  console.log(`Running cronjob, ${date.toLocaleTimeString('de')} ⏰`);

  cronjob({ verbose: true });
}, ( 1000 * 60 * 10 )) // every 10 minutes