// settings up env files
import dotenv from 'dotenv';

// utils
import cronjob from './utils/cronjob';

dotenv.config();

const interval = setInterval(() => {
  cronjob();
}, ( 1000 * 60 * 10 )) // every 10 minutes