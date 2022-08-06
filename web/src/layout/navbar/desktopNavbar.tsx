import React from 'react';

// mantine
import { createStyles, useMantineTheme, keyframes } from '@mantine/styles'

// components
import InnerNav from './navItems';

const animateIn = keyframes({
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
})

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
    animation: `${animateIn} forwards .15s ease-in`,
    [ t.fn.smallerThan('md') ]: {
      display: 'none'
    }
  },
  navToLeft: {
    left: 0,
  },
  navToRight: {
    right: 0,
  }
}));

interface Props {
  width: string
}
const DesktopNavbar = ({ width }: Props) => {
  const { classes, cx } = useStyles();
  const { dir } = useMantineTheme();

  return (
    <nav style={{ width }} className={cx( classes.nav, dir === 'ltr' ? classes.navToLeft : classes.navToRight )} >  
      <InnerNav />
    </nav>
  )
}

export default DesktopNavbar;