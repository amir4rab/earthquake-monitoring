import { useState } from 'react';

import Ua from 'ua-parser-js';

const useUa = () => {
  const [us] = useState(new Ua().getResult());

  return us;
};

export default useUa;
