// types
import type { Prisma } from '@prisma/client'

// crypto
import crypto from 'node:crypto';

// utils
import xmlToJson from './xmlToJson';

// mappedStates
const mappedStates = {
  "east-azarbaijan": 0,
  "west-azarbaijan": 1,
  "ardabil": 2, "ardebil": 2,
  "esfahan": 3, "isfahan": 3,
  "alborz": 4,
  "ilam": 5,
  "bushehr": 6,
  "tehran": 7,
  "chaharmahal-and-bakhtiari": 8, "chaharmahal-va-bakhtiari": 8,
  "southern-khorasan": 9, "south-khorasan": 9,
  "khorasan-razavi": 10,
  "north-khorasan": 11,
  "khuzestan": 12,
  "zanjan": 13,
  "semnan": 14,
  "sistan-and-baluchestan": 15, "sistan-va-baluchestan": 15,
  "fars": 16,
  "qazvin": 17,
  "qom": 18,
  "kurdistan": 19,
  "kerman": 20,
  "kermanshah": 21,
  "kohgiloyeh-and-Boyerahmad": 22, "kohgiloyeh-va-Boyerahmad": 22,
  "golestan": 23,
  "guilan": 24, "gilan": 24,
  "lorestan": 25,
  "mazandaran": 26,
  "markazi": 27,
  "hormozgan": 28,
  "hamedan": 29,
  "yazd": 30
}

const getData = async (verbose= false) => {
  try {
    const fetch = (await import('node-fetch')).default;

    const [ enResponse, faResponse ] = await Promise.all([
      await fetch('http://irsc.ut.ac.ir/events_list.xml'),
      await fetch('http://irsc.ut.ac.ir/events_list_fa.xml')
    ]);

    const [ enXml, faXml ] = await Promise.all([
      enResponse.text(),
      faResponse.text()
    ]);

    const enJson = xmlToJson(enXml);
    const faJson = xmlToJson(faXml);

    if ( enJson === null || faJson === null ) return null

    const exportedArray: Prisma.EarthquakeCreateInput[] = [];
    
    enJson.forEach((i, index) => {
      const [ cityNameEn, stateEn ] = i.reg1.split(', ');
      const [ cityNameFa, _ ] = faJson[index].reg1.split('&#1548; ');

      const state = stateEn.toLowerCase().replace(/ /g, '-');
      const stateCode = mappedStates.hasOwnProperty(state) ? (( mappedStates as unknown ) as { [v: string]: number } )[state] : null;


      if ( stateCode !== null ) {
        const obj = {
          date: new Date(i.date).toISOString(),
          dep: parseFloat(i.dep),
          mag: parseFloat(i.mag),
          lat: i.lat,
          long: i.long,
          reg: 1,
          state: stateCode,
          city: {
            connectOrCreate: {
              create: {
                name: cityNameEn.toLocaleLowerCase(),
                nameFa: cityNameFa,
              },
              where: {
                name: cityNameEn.toLocaleLowerCase()
              }
            }
          }
        }
  
        exportedArray.push({
          ...obj,
          id: crypto.createHash('sha256').update(JSON.stringify(obj)).digest('base64')
        })
      }

      if ( stateCode === null && verbose ) console.error(`⚠️ Failed to find state code for "${stateEn}"`);
    });

    return exportedArray
  } catch(err) {
    console.log('⚠️ Error in "getData": ', err);
    return null;
  }
};

export default getData;