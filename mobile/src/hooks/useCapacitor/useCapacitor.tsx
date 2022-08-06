import { useCallback, useEffect, useState } from 'react';

import { App } from '@capacitor/app';

import { useNavigate, useLocation } from 'react-router-dom';


const useCapacitor = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [ perRoute, setPerRoute ] = useState< null | string>(null);

  const setupListeners = useCallback(() => {
    App.addListener('backButton', () => {
      if ( perRoute !== pathname ) { // going one page back incase pages were not the same
        setPerRoute(pathname);
        navigate(-1);
        return;
      };

      // the only other case is user is on the home and clicked back button therefore app will be closed
      App.exitApp();
    })
  }, [ pathname, perRoute ]);

  const clearEventListeners = () => {
    App.removeAllListeners();
  }

  useEffect(() => {
    if ( import.meta.env.VITE_ANDROID_BUILD !== '1' ) return;

    setupListeners();

    return () => {
      clearEventListeners();
    }
  }, [ setupListeners ])

  return undefined;
};

export default useCapacitor;