import { lazy, Suspense } from 'react';

// react-router-dom
import { Outlet, Route, Routes as ReactRouterDomRoutes, useLocation } from 'react-router-dom';

// framer
import { AnimatePresence, motion, LazyMotion, domAnimation, m } from 'framer-motion'

// components
import LoadingDisplay from '@/components/loadingDisplay';
import Home from '@/components/home';
import PwaInstallPrompt from '@/components/pwaInstallPrompt/pwaInstallPrompt';

// lazy loaded components
const State = lazy(() => import('@/components/state'));
const States = lazy(() => import('@/components/states'));
const Nearme = lazy(() => import('@/components/nearme'));
const About = lazy(() => import('@/components/about'));


// page wrapper
const PageWrapper = () => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ x: '100%', zIndex: 0, opacity: 0  }}
        animate={{ x: 0, zIndex: 1, opacity: 1, transition: { duration: .15, ease: 'linear' } }}
        exit={{ x: '-100%', zIndex: 0, opacity: 0, transition: { duration: .15, ease: 'linear' }  }}
      >
        <Suspense fallback={ <LoadingDisplay /> }>
        <Outlet />
        </Suspense>
      </m.div>
    </LazyMotion>
  );
};

const Routes = () => {
  const location = useLocation()

  return (
    <AnimatePresence initial={ false } exitBeforeEnter={ false }>
      <ReactRouterDomRoutes location={location} key={location.pathname}>
        <Route element={ <PageWrapper /> }>
          <Route 
            path='/'
            element={ import.meta.env.VITE_PWA_BUILD === '1' ? <PwaInstallPrompt /> : <Home /> }
          />
          <Route 
            path='/pwa-home' 
            element={ <Home /> } 
          />
          <Route 
            path='/states' 
            element={ <States /> } 
          />
          <Route 
            path='/states/:id' 
            element={ <State /> } 
          />
          <Route 
            path='/nearme' 
            element={ <Nearme /> } 
          />
          <Route 
            path='/about' 
            element={ <About /> } 
          />
        </Route>
      </ReactRouterDomRoutes>
    </AnimatePresence>
  )
};

export default Routes;