import React from 'react'

// mantine components
import { Container, createStyles } from '@mantine/core';;

import DesktopNavbar from './navbar/desktopNavbar'
import MobileNavbar from './navbar/mobileNavbar'

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