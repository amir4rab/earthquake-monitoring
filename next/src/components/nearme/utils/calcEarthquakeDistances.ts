// geolib
import { getDistance } from 'geolib'

// types
import type { ExtendedEarthquake } from '../nearme';
import { Earthquake } from '@prisma/client';

interface CalcEarthquakeDistancesProps {
  geoData: { lat: number, long: number } | null;
  earthquakesArr: Earthquake[]
};

/** Calculates user distance from earthquakes */
const calcEarthquakeDistances = ({ geoData, earthquakesArr }: CalcEarthquakeDistancesProps) => {
  try {
    if ( geoData === null ) return null
    let minDistance: number = 0, maxDistance: number = 0;
    const userLocation =  { lat: geoData.lat , lon: geoData.long };
    
    const resultArr: ExtendedEarthquake[] = earthquakesArr.map((earthquake) => {
      const earthquakeLocation = { lat: parseFloat(earthquake.lat.slice(0, -1)) , lon: parseFloat(earthquake.long.slice(0, -1)) };
  
      const dis = parseInt((getDistance(userLocation, earthquakeLocation, 1) / 1_000).toFixed(0));
  
      if ( minDistance > dis || minDistance === 0 ) minDistance = dis;
      if ( maxDistance < dis ) maxDistance = dis;
  
      return ({
        ...earthquake,
        distance: dis
      })
    });    
  
    return ({
      distances: { min: minDistance, max: maxDistance },
      resultArr
    })
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default calcEarthquakeDistances;