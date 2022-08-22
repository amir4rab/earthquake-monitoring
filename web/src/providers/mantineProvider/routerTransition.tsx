import React, { useCallback, useEffect, useRef } from 'react';

// next
import { useRouter } from 'next/router';

// mantine
import {
  startNavigationProgress,
  resetNavigationProgress,
  NavigationProgress
} from '@mantine/nprogress';

const RouterTransition = () => {
  const firstRender = useRef(true);
  const { events, asPath } = useRouter();

  const handleStart = useCallback(
    (url: string) => url !== asPath && startNavigationProgress(),
    [asPath]
  );
  const handleComplete = useCallback(() => resetNavigationProgress(), []);

  useEffect(() => {
    if (!firstRender.current) return;
    firstRender.current = false;

    events.on('routeChangeStart', handleStart);
    events.on('routeChangeComplete', handleComplete);
    events.on('routeChangeError', handleComplete);
  }, [events, handleStart, handleComplete]);

  return <NavigationProgress zIndex={1006} />;
};

export default RouterTransition;
