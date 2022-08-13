import React, { useEffect, useState } from 'react';

// leaflet
import { MapContainer, TileLayer, Circle, useMapEvent, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

// mantine
import { createStyles, keyframes } from '@mantine/styles';
import { Box, BoxProps, Loader } from '@mantine/core';

// types
import type { ExtendedCircleProps } from '@/types/extendedCircleProps';
import type { MapOptions } from 'leaflet';

export interface Props extends BoxProps {
  elements?: ExtendedCircleProps[];
  zoom?: number;
  mapCenter?: MapOptions['center'];
  selectPos?: boolean;
  onPos?: ({ lat, lng }:{ lat: number, lng: number }) => void;
}

const SetViewOnClick = () => {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    })
  })

  return null
};

interface SetLocationOnClick {
  onPos: Props['onPos'];
}
const SetLocationOnClick = ({ onPos }: SetLocationOnClick) => {
  const [ pos, setPos ] = useState({ lat: 33, lng: 53 });

  useMapEvent('click', (e) => {
    const pos = e.latlng;

    setPos({
      ...pos
    })
    onPos && onPos({
      ...pos
    })
  });

  return (
    <Marker position={ pos } />
  )
}

const animateIn = keyframes({
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
});

const animateOut = keyframes({
  from: {
    opacity: 1
  },
  to: {
    opacity: 0
  }
})

const useStyles = createStyles((t) => ({
  mapWrapper: {
    animation: `${animateIn} .3s ease-in-out forwards`,
    borderRadius: t.radius.lg,
    overflow: 'hidden',
    height: '500px', 
    boxShadow: t.shadows.md,
    width: '100%', 
    filter: t.colorScheme === 'dark' ? 'invert(1) hue-rotate(180deg) grayscale(0.7)' : 'none',
    position: 'relative'
  },
  loader: {
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    animation: `${animateOut} .3s ease-in-out forwards`
  }
}));

/**
 * Displays a Leaflet map
 */
const Map = ({ elements= [], mapCenter= [33, 53], zoom=5, selectPos= false, onPos, ...props }: Props) => {
  const { classes } = useStyles();
  const [ bufferedData, setBufferedData ] = useState<ExtendedCircleProps[]>([]);

  useEffect(() => {
    setBufferedData(elements)
  }, [ elements ])

  return (
    <Box className={ classes.mapWrapper } { ...props } >
      <Loader className={ classes.loader } />
      <MapContainer 
        style={{ height: '100%', width: '100%' }} 
        center={ mapCenter } 
        zoom={ zoom } 
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          !selectPos && <SetViewOnClick/>
        }
        {
          selectPos && <SetLocationOnClick onPos={ onPos } />
        }
        {
          bufferedData.map(({ key, ...props }) => (
            <Circle { ...props } key={ key } />
          ))
        }
      </MapContainer>
    </Box>
  )
};

export default Map