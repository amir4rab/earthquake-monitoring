const getTimeInterval = ( defaultTimeInterval: number ): number  => {
  let result = defaultTimeInterval;

  try {
    const interval = parseInt(process.env.TIME_INTERVAL as string);
    result = !isNaN(interval) ? interval : defaultTimeInterval;
  } catch {
    console.error(`Your "TIME_INTERVAL" env file isn't a number, falling back to default interval number of ten minutes`)

    result = defaultTimeInterval
  }

  return result;
};

export default getTimeInterval;