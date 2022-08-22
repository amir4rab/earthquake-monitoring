// mantine
import { Group, BoxProps, Box, Text, createStyles } from '@mantine/core';
import { useMove } from '@mantine/hooks';

// react-i18next
import { useTranslation } from 'react-i18next';

// styles
const useStyles = createStyles((t) => ({
  root: {
    margin: `0 1rem`,
    width: '100%',
    height: 8,
    backgroundColor:
      t.colorScheme === 'dark' ? t.colors.dark[5] : t.colors.gray[1],
    position: 'relative',
    borderRadius: t.radius.md
  },
  track: {
    left: 0,
    height: 8,
    backgroundColor:
      t.colorScheme === 'dark'
        ? t.colors[t.primaryColor][9] + '70'
        : t.colors[t.primaryColor][2] + '70',
    borderRadius: t.radius.md
  },
  thumb: {
    transition: 'background .15s ease-in-out',
    userSelect: 'none',
    position: 'absolute',
    top: '-50%',
    borderRadius: '50%',
    width: '1rem',
    height: '1rem',
    background: t.colors[t.primaryColor][7],
    ['&:hover']: {
      cursor: 'grab',
      background:
        t.colorScheme === 'dark'
          ? t.colors[t.primaryColor][3]
          : t.colors[t.primaryColor][9]
    }
  },
  marksWrapper: {
    width: '100%',
    position: 'relative',
    minHeight: '1rem'
  },
  mark: {
    position: 'absolute',
    top: '50%',
    transform: ''
  }
}));

type MarkType =
  | { value: number; label: string; i18nKey?: string }
  | { value: number; label?: undefined; i18nKey: string };

export interface SliderProps {
  boxStyles?: BoxProps;
  value: number;
  label?: string;
  onChange: (v: number) => void;
  marks?: MarkType[];
}
const Slider = ({
  boxStyles = {},
  onChange,
  value,
  marks = [],
  label
}: SliderProps) => {
  const { ref } = useMove(({ x }) =>
    onChange(parseFloat((x * 100).toFixed(2)))
  );
  const { classes } = useStyles();
  const { t } = useTranslation();

  return (
    <Box {...boxStyles}>
      {label && <Text mb='md'>{label}</Text>}
      <Group dir='ltr' position='center'>
        {marks.length !== 0 && (
          <div className={classes.marksWrapper}>
            {marks.map(({ label, value, i18nKey }) => (
              <Text
                size='xs'
                style={{
                  left: `${value}%`,
                  transform:
                    value === 100
                      ? 'translate(-100%, -50%)'
                      : value === 0
                      ? 'translate(0%, -50%)'
                      : 'translate(-50%, -50%)'
                }}
                className={classes.mark}
                key={value}>
                {typeof i18nKey !== 'undefined' ? t(i18nKey) : label}
              </Text>
            ))}
          </div>
        )}
        <div ref={ref} className={classes.root}>
          <div className={classes.track} style={{ width: `${value}%` }} />
          <div
            style={{ left: `calc(${value}% - 8px)` }}
            className={classes.thumb}
          />
        </div>
      </Group>
    </Box>
  );
};

export default Slider;
