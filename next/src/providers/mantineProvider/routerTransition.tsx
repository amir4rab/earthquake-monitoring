import React, { useCallback, useEffect, useRef } from 'react';

// next
import { useRouter } from 'next/router';

// mantine
import { startNavigationProgress, resetNavigationProgress, NavigationProgress } from '@mantine/nprogress';

const RouterTransition = () => {
  const firstRender = useRef(true);
  const router = useRouter();

  const handleStart = useCallback((url: string) => url !== router.asPath && startNavigationProgress(), []);
  const handleComplete = useCallback(() => resetNavigationProgress(), []);
  
  useEffect(() => {
    if ( !firstRender.current ) return;
    firstRender.current = false;
    
    router.events.on('routeChangeStart',  handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, []);

  return <NavigationProgress zIndex={1006} />;
};

export default RouterTransition;