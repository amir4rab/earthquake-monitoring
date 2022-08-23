import { XMLParser } from 'fast-xml-parser';

interface itemSchema {
  id: number;
  reg1: string;
  dis1: string;
  reg2: string;
  dis2: string;
  reg3: string;
  dis3: string;
  mag: string;
  dep: string;
  long: string;
  lat: string;
  date: string;
}

/**
 * Converts XML to JSON
 * @param { string } XMLdata
 * @returns { itemSchema[] | null }
 */
const xmlToJson = (XMLdata: string): itemSchema[] | null => {
  try {
    const parser = new XMLParser();

    const jObj = parser.parse(XMLdata);
    const returnedArray = jObj.items.item.slice(1) as itemSchema[];

    return returnedArray;
  } catch (err) {
    console.error(`⚠️ Error in "submitToDatabase": `, err);
    return null;
  }
};

export default xmlToJson;
