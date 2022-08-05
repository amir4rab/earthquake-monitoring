// settings up env files
import dotenv from 'dotenv';

// utils
import cronjob from './utils/cronjob';

dotenv.config();

const date = new Date();

console.log(`Started cronjob server at ${date.toLocaleDateString('de')} ${date.toLocaleTimeString('de')}. ⚡`);
let connectedToNext= false;

(async () => {
  while( !connectedToNext ) {
    connectedToNext = await new Promise<boolean>( async (resolve) => {
      setTimeout( async () => {
        try {
          const fetch = (await import('node-fetch')).default;
          await fetch(process.env.NEXT_JS_API_ROUTE as string);
      
          resolve(true);
          console.log('Connected to Next.js 🎉')

          setInterval(() => {
            const date = new Date();
            console.log(`Running cronjob, ${date.toLocaleTimeString('de')} ⏰`);
          
            cronjob({ verbose: true, revalidateInDev: true });
          }, ( 1000 * 60 * 10 )); // every 10 minutes
    
        } catch(err) {
          resolve(false);
        }
      }, 1000 * 10) // starting after five minutes in order to wait for next.js server to become ready
    });
  }
})()

