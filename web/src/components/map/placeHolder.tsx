/* eslint-disable @next/next/no-img-element */
import { useMantineTheme } from '@mantine/core';

const PlaceHolder = () => {
  const t = useMantineTheme();

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '1rem', overflow: 'hidden'  }}>
      <img
        style={{ 
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          overflow: 'hidden',
          filter: t.colorScheme === 'dark' ? 'invert(1) hue-rotate(180deg) grayscale(0.7)' : 'none',
        }}
        alt='map image placeholder'
        src='/assets/leaflet/map-placeholder.jpg'
      />
    </div>
  )
};
export default PlaceHolder;