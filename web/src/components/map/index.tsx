import { Center, Loader } from '@mantine/core';
import dynamic from 'next/dynamic';

const Map = dynamic(
  () => import('./map'), 
  {
    ssr: false, 
    loading: () => (<Center sx={{ height: '100%', width: '100%' }}><Loader /></Center>) 
  }
);

export default Map;