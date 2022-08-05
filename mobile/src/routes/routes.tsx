import { Route, Routes as ReactRouterDomRoutes } from 'react-router-dom'


import Home from '@/components/home';
import State from '@/components/state';
import States from '@/components/states';
import Nearme from '@/components/nearme';
import PwaInstallPrompt from '@/components/pwaInstallPrompt/pwaInstallPrompt';
import About from '@/components/about';

const Routes = () => {
  return (
    <ReactRouterDomRoutes>
      <Route path='/' element={ import.meta.env.VITE_PWA_BUILD === '1' ? <PwaInstallPrompt /> : <Home /> } />
      <Route path='/pwa-home' element={ <Home /> } />
      <Route path='/states' element={ <States /> } />
      <Route path='/states/:id' element={ <State /> } />
      <Route path='/nearme' element={ <Nearme /> } />
      <Route path='/about' element={ <About /> } />
    </ReactRouterDomRoutes>
  )
};

export default Routes;