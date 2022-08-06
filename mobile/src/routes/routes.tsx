import { lazy, Suspense } from 'react';

// react-router-dom
import { Route, Routes as ReactRouterDomRoutes } from 'react-router-dom'

// components
import LoadingDisplay from '@/components/loadingDisplay';
import Home from '@/components/home';
import PwaInstallPrompt from '@/components/pwaInstallPrompt/pwaInstallPrompt';

// lazy loaded components
const State = lazy(() => import('@/components/state'));
const States = lazy(() => import('@/components/states'));
const Nearme = lazy(() => import('@/components/nearme'));
const About = lazy(() => import('@/components/about'));

const Routes = () => {
  return (
    <ReactRouterDomRoutes>
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
        element={
          <Suspense fallback={ <LoadingDisplay /> }>
            <States />
          </Suspense>
        } 
      />
      <Route 
        path='/states/:id' 
        element={
          <Suspense fallback={ <LoadingDisplay /> }>
            <State />
          </Suspense>
        } 
      />
      <Route 
        path='/nearme' 
        element={
          <Suspense fallback={ <LoadingDisplay /> }>
            <Nearme />
          </Suspense>
        } 
      />
      <Route 
        path='/about' 
        element={
          <Suspense>
            <About />
          </Suspense>
        } 
      />
    </ReactRouterDomRoutes>
  )
};

export default Routes;