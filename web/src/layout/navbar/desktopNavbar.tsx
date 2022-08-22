import React, { memo } from 'react';

// mantine
import { createStyles, useMantineTheme } from '@mantine/styles';

// components
import InnerNav from './navItems';

// styles
const useStyles = createStyles((t) => ({
  nav: {
    background: t.colorScheme === 'dark' ? t.colors.dark[5] : t.colors.dark[7],
    boxShadow: t.shadows.md,
    height: '100vh',
    position: 'fixed',
    top: 0,
    padding: `5vh ${t.spacing.md}px`,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    [t.fn.smallerThan('md')]: {
      display: 'none'
    }
  },
  navToLeft: {
    left: 0
  },
  navToRight: {
    right: 0
  }
}));

interface Props {
  width: string;
}
const DesktopNavbar = ({ width }: Props) => {
  const { classes, cx } = useStyles();
  const { dir } = useMantineTheme();

  return (
    <nav
      style={{ width }}
      className={cx(
        classes.nav,
        dir === 'ltr' ? classes.navToLeft : classes.navToRight
      )}>
      <InnerNav />
    </nav>
  );
};

export default memo(DesktopNavbar);
