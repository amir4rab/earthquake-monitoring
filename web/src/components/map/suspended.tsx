// react
import { Suspense, useState, useEffect, useRef } from 'react';

// mantine
import { Center, Loader, LoadingOverlay } from '@mantine/core';

// components
import { Props } from './map';
import PlaceHolder from './placeHolder';
import dynamic from 'next/dynamic';

// lazy components
const LazyMap = dynamic(() => import('./index'), { ssr: false });

const SuspendedMap = (props: Props) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [render, setRender] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    timeoutRef.current = setTimeout(() => {
      setRender(true);
      loadingTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, 150);

    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      loadingTimeoutRef.current && clearTimeout(loadingTimeoutRef.current);
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '1em',
        width: '100%',
        height: '100%'
      }}>
      <LoadingOverlay zIndex={1000} visible={isLoading} />
      {!render ? (
        <PlaceHolder />
      ) : (
        <Suspense
          fallback={
            <Center sx={{ height: '100%', width: '100%' }}>
              <Loader />
            </Center>
          }>
          <LazyMap {...props} />
        </Suspense>
      )}
    </div>
  );
};

export default SuspendedMap;
