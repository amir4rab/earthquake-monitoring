export interface DetectBrowserSupportResult {
  supported: boolean;
  os: 'ios' | 'android' | 'others';
}

/** Detects if users browser supports pwa */
export const detectBrowserSupport = (
  browser: UAParser.IBrowser,
  os: UAParser.IOS
): DetectBrowserSupportResult => {
  if (typeof os.name === 'undefined' || typeof browser.name === 'undefined')
    return { supported: false, os: 'others' };

  switch (os.name.toLocaleLowerCase()) {
    case 'ios': {
      if (browser.name.toLocaleLowerCase().includes('safari'))
        return { supported: true, os: 'ios' };
      return { supported: false, os: 'ios' };
    }
    default: {
      const browserName = browser.name.toLowerCase();
      const supportedBrowser = ['chromium', 'chrome', 'edge', 'brave'];

      if (supportedBrowser.includes(browserName))
        return {
          supported: true,
          os: os.name === 'Android' ? 'android' : 'others'
        };
      return {
        supported: false,
        os: os.name === 'Android' ? 'android' : 'others'
      };
    }
  }
};
