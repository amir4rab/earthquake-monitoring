import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import 'i18n/config';

import MantineProvider from '@/providers/mantineProvider';

import Routes from '@routes';

import Layout from 'src/layout';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <Layout>
          <Routes />
        </Layout>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
)
