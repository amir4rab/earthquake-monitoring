import React from 'react';

// mantine
import { createStyles } from '@mantine/styles';
import { Group, GroupProps } from '@mantine/core';
import { useMove } from '@mantine/hooks';

// styles
const useStyles = createStyles((t) => ({
  root: {
    width: '100%',
    height: 8,
    backgroundColor: t.colorScheme === 'dark' ? t.colors.dark[5] : t.colors.gray[1],
    position: 'relative',
    borderRadius: t.radius.md,
  },
  track: {
    left: 0,
    height: 8,
    backgroundColor: t.colorScheme === 'dark' ? t.colors[t.primaryColor][9] + '70' : t.colors[t.primaryColor][2] + '70',
    borderRadius: t.radius.md,
  },
  thumb: {
    transition: 'background .15s ease-in-out',
    userSelect: 'none',
    position: 'absolute',
    top: '-50%',
    borderRadius: '50%',
    width: 16,
    height: 16,
    background: t.colors[t.primaryColor][7],
    [ '&:hover' ]: {
      cursor: 'grab',
      background: t.colorScheme === 'dark' ? t.colors[t.primaryColor][3] :  t.colors[t.primaryColor][9],
    }
  }
}));

interface SliderProps {
  groupStyles?: GroupProps;
  value: number;
  onChange: ( v: number ) => void;
};
const Slider = ({ groupStyles= {}, onChange, value }: SliderProps ) => {
  const { ref } = useMove(({ x }) => onChange(parseFloat((x * 100).toFixed(2))));
  const { classes } = useStyles();

  return (
    <Group dir='ltr' position='center' { ...groupStyles }>
      <div ref={ref} className={ classes.root } >
        <div
          className={ classes.track }
          style={{ width: `${value}%` }}
        />
        <div
          style={{ left: `calc(${value}% - 8px)` }}
          className={ classes.thumb }
        />
      </div>
    </Group>
  );
};

export default Slider;