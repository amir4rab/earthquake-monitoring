import React from 'react';

// leaflet
import { MapContainer, TileLayer, Circle, CircleProps, useMapEvent } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

// mantine
import { createStyles, keyframes } from '@mantine/styles';
import { Box, BoxProps, Loader } from '@mantine/core';
import { MapOptions } from 'leaflet';

const SetViewOnClick = () => {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    })
  })

  return null
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

interface Props extends BoxProps {
  elements?: CircleProps[];
  zoom?: number;
  mapCenter?: MapOptions['center'];
}
const Map = ({ elements= [], mapCenter= [33, 53], zoom=5, ...props }: Props) => {
  const { classes } = useStyles();

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
        <SetViewOnClick/>
        {
          elements.map(el => (
            <Circle { ...el } />
          ))
        }
      </MapContainer>
    </Box>
  )
};

export default Map