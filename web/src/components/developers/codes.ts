const data = {
  "latest-js": `
const apiUrl = 'https://earthquake-monitoring.amir4rab.com/api/latest';

const getData = async () => {
  try {
    const data = await fetch(apiUrl);
    const json = await data.json();

    return json.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}
  `,
  "latest-ts": `
const apiUrl = 'https://earthquake-monitoring.amir4rab.com/api/latest';

type Earthquake = {
  id: string;
  state: number;
  reg: number;
  mag: number;
  dep: number;
  long: string;
  lat: string;
  date: Date;
  nameEn: string;
  city: {
    name: string,
    nameFa: string
  }
}

interface ApiResponse {
  err: string | null;
  data: Earthquake[] | null
}

const getData = async () => {
  try {
    const data = await fetch(apiUrl);
    const json = await data.json() as ApiResponse;

    if ( json.data === null ) {
      json.err && console.error(json.err);
      return [];
    }

    return json.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}  
`,
  'state-js': `
const apiUrl = 'http://localhost:3000/api/state';

const defaultReturn = {
  latestEarthquakesArr: [],
  totalPages: 0
}

const getData = async () => {
  try {
    // states start from 0 and ends at 30, pages start at 1, and the furthest page you can request from api is 5
    const data = await fetch(apiUrl + '?state=0&page=1');
    const json = await data.json();

    if ( json.data === null ) {
      json.err && console.error(json.err);
      return ( defaultReturn );
    }

    return json.data;
  } catch (err) {
    console.error(err);
    return defaultReturn;
  }
}
`,
  'state-ts': `
const apiUrl = 'http://localhost:3000/api/state';

type Earthquake = {
  id: string;
  state: number;
  reg: number;
  mag: number;
  dep: number;
  long: string;
  lat: string;
  date: Date;
  nameEn: string;
  city: {
    name: string,
    nameFa: string
  }
}

export interface StatesData {
  latestEarthquakesArr: Earthquake[];
  totalPages: number;
};

interface ApiResponse {
  err: string | null;
  data: StatesData | null
};

const defaultReturn = {
  latestEarthquakesArr: [],
  totalPages: 0
}

const getData = async () => {
  try {
    // states start from 0 and ends at 30, pages start at 1, and the furthest page you can request from api is 5
    const data = await fetch(apiUrl + '?state=0&page=1');
    const json = await data.json() as ApiResponse;

    if ( json.data === null ) {
      json.err && console.error(json.err);
      return ( defaultReturn );
    }

    return json.data;
  } catch (err) {
    console.error(err);
    return defaultReturn;
  }
} 
  `,
  'states-mapping': `
{
  "0": "East Azarbaijan",
  "1": "West Azarbaijan",
  "2": "Ardabil",
  "3": "Isfahan",
  "4": "Alborz",
  "5": "Ilam",
  "6": "Bushehr",
  "7": "Tehran",
  "8": "Chaharmahal and Bakhtiari",
  "9": "Southern Khorasan",
  "10": "Khorasan Razavi",
  "11": "Northern Khorasan",
  "12": "Khuzestan",
  "13": "Zanjan",
  "14": "Semnan",
  "15": "Sistan and Baluchestan",
  "16": "Fars",
  "17": "Qazvin",
  "18": "Qom",
  "19": "Kurdistan",
  "20": "Kerman",
  "21": "Kermanshah",
  "22": "Kohgiloyeh and Boyerahmad",
  "23": "Golestan",
  "24": "Guilan",
  "25": "Lorestan",
  "26": "Mazandaran",
  "27": "Markazi",
  "28": "Hormozgan",
  "29": "Hamedan",
  "30": "Yazd"
}
  ` 
};

export default data;