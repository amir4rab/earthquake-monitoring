import React, { Suspense } from 'react'

// mantine components
import { Container, createStyles } from '@mantine/core';
import dynamic from 'next/dynamic';

// components
const DesktopNavbar =  dynamic(() => import('./navbar/desktopNavbar'), { suspense: true, ssr: false });
const MobileNavbar = dynamic(() => import('./navbar/mobileNavbar'), { suspense: true, ssr: false });

const desktopNavbarWidth= 'max(20vw, 17rem)';
const useStyles = createStyles((t) => ({
  container: {
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
  const { classes } = useStyles();

  return (
    <Suspense>
      <DesktopNavbar width={ desktopNavbarWidth }/>
      <MobileNavbar />
      <div className={ classes.container }>
        <Container>
          { children }
        </Container>
      </div>
    </Suspense>
  )
}

export default Layout