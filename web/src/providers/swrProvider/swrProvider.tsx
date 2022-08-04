import React, { ReactNode } from 'react';

// swr
import { SWRConfig } from 'swr';

const SwrProvider = ({ children }:{ children: ReactNode }) => {
  return (
    <SWRConfig>
      { children }
    </SWRConfig>
  )
};

export default SwrProvider;