import React, { useState } from 'react';

// mantine components
import { ActionIcon, Drawer, useMantineTheme } from '@mantine/core';

// icons
import { IoMenu } from 'react-icons/io5';

// components
import InnerNav from './navItems';

const MobileNavbar = () => {
  const [ drawerState, setDrawerState ] = useState(false);
  const { colorScheme, dir } = useMantineTheme();

  return (
    <>
      <ActionIcon
        size='xl'
        variant='filled'
        color={ colorScheme === 'dark' ? 'gray' : 'dark' }
        sx={(t) => ({
          borderRadius: '50%',
          zIndex: 1001,
          position: 'fixed',
          right: t.dir === 'ltr' ? '2rem' : 'auto',
          left: t.dir === 'rtl' ? '2rem' : 'auto',
          bottom: '2rem',
          [ t.fn.largerThan('md') ]: {
            display: 'none'
          }
        })}
        onClick={ () => setDrawerState(true) }
      >
        <IoMenu />
      </ActionIcon>
      <Drawer
        zIndex={ 1002 }
        transition={ dir === 'ltr' ? 'slide-right' : 'slide-left' }
        styles={(t) => ({ drawer:{ background: t.colors.dark[7] }})} 
        padding='lg' 
        onClose={ () => setDrawerState(false) } 
        opened={ drawerState }
      >
        <InnerNav onLinkClick={ () => setDrawerState(false) } onSearch={ () => setDrawerState(false) } />
      </Drawer>
    </>
  )
}

export default MobileNavbar;