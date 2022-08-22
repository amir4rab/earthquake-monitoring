import React, { memo, useState } from 'react';

// mantine components
import { ActionIcon, Drawer } from '@mantine/core';
import { useMantineTheme } from '@mantine/styles';

// icons
import { IoMenu } from 'react-icons/io5';

// components
import InnerNav from './navItems';

const MobileNavbar = () => {
  const [drawerState, setDrawerState] = useState(false);
  const { colorScheme, dir } = useMantineTheme();

  return (
    <>
      <ActionIcon
        size='xl'
        variant='filled'
        color={colorScheme === 'dark' ? 'gray' : 'dark'}
        sx={(t) => ({
          borderRadius: '50%',
          zIndex: 1001,
          position: 'fixed',
          right: '2rem',
          bottom: '2rem',
          [t.fn.largerThan('md')]: {
            display: 'none'
          }
        })}
        onClick={() => setDrawerState(true)}>
        <IoMenu />
      </ActionIcon>
      <Drawer
        zIndex={1002}
        transition={dir === 'ltr' ? 'slide-right' : 'slide-left'}
        position={dir === 'ltr' ? 'left' : 'right'}
        styles={(t) => ({ drawer: { background: t.colors.dark[7] } })}
        padding='lg'
        onClose={() => setDrawerState(false)}
        opened={drawerState}>
        <InnerNav
          onLinkClick={() => setDrawerState(false)}
          onSearch={() => setDrawerState(false)}
        />
      </Drawer>
    </>
  );
};

export default memo(MobileNavbar);
