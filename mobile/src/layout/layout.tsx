import { useCallback, useEffect, useRef } from 'react'

// mantine components
import { Container, createStyles } from '@mantine/core';

// components
import DesktopNavbar from './navbar/desktopNavbar';
import MobileNavbar from './navbar/mobileNavbar';
import useCapacitor from '@/hooks/useCapacitor';

// router 
import { useLocation } from 'react-router-dom'

const desktopNavbarWidth= 'max(20vw, 17rem)';
const useStyles = createStyles((t) => ({
  container: {
    overflowX: 'hidden',
    [ t.fn.largerThan('md') ]: {
      paddingLeft: t.dir === 'ltr' ? desktopNavbarWidth : 0,
      paddingRight: t.dir === 'rtl' ? desktopNavbarWidth : 0,
    }
  }
}))

interface Props {
  children: JSX.Element | JSX.Element[];
}
function Layout( { children }: Props ) {
  const firstRender = useRef(true);
  const { classes } = useStyles();
  const { pathname } = useLocation();
  useCapacitor();

  const hideLoadingOverlay = useCallback(() => {
    const el = document.getElementById('loading-overlay') as HTMLDivElement;
    el.setAttribute('class', 'hidden-overlay align-center')
    setTimeout(() => {
      el.remove()
    }, 700)
  }, []);

  useEffect(() => {
    if ( !firstRender.current ) return;
    firstRender.current = false;
    hideLoadingOverlay();
  })



  // hiding nav incase, user is on pwa install prompt
  if ( import.meta.env.VITE_PWA_BUILD === '1' && pathname === '/' ) return (
    <Container>
      { children }
    </Container>
  )

  return (
    <>
      <DesktopNavbar width={ desktopNavbarWidth }/>
      <MobileNavbar />
      <div className={ classes.container }>
        <Container>
          { children }
        </Container>
      </div>
    </>
  )
}

export default Layout