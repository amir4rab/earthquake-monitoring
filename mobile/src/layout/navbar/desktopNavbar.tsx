// mantine
import { createStyles } from '@mantine/core'

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
    left: 0,
    [ t.fn.smallerThan('md') ]: {
      display: 'none'
    }
  }
}));

interface Props {
  width: string
}
const DesktopNavbar = ({ width }: Props) => {
  const { classes } = useStyles();
  return (
    <nav style={{ width }} className={ classes.nav } >  
      <InnerNav />
    </nav>
  )
}

export default DesktopNavbar;