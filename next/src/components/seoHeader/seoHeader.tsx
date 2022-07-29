const websiteUrl = 'https://earthquake-monitoring-amir4rab.com';

interface Props {
  lang: string;
  title: string;
  subtitle: string;
}
/**
 * Adds pwa headers and open graph headers
 */
const SeoHeader = ({ lang, title, subtitle }: Props) => {
  return (
    <>
      <link rel='manifest' href={`/manifest.${lang}.webmanifest`} />
      <link rel='shortcut icon' href='/assets/favicons/favicon-32x32.png' />

      <meta name='application-name' content={ title } />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content={ title } />
      <meta name='description' content={ subtitle } />
      <meta name='format-detection' content='telephone=no' />
      <meta name='mobile-web-app-capable' content='yes' />

      <meta name='theme-color' content='#4C6EF5' />

      <link rel='apple-touch-icon' href='/assets/pwa-icons/touch-icon-iphone.png' />
      <link rel='apple-touch-icon' sizes='152x152' href='/assets/pwa-icons/touch-icon-ipad.png' />
      <link rel='apple-touch-icon' sizes='180x180' href='/assets/pwa-icons/touch-icon-iphone-retina.png' />
      <link rel='apple-touch-icon' sizes='167x167' href='/assets/pwa-icons/touch-icon-ipad-retina.png' />

      <link rel='icon' type='image/png' sizes='32x32' href='/assets/favicons/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/assets/favicons/favicon-16x16.png' />
          
      <meta name='twitter:card' content={ subtitle } />
      <meta name='twitter:url' content={ websiteUrl } />
      <meta name='twitter:title' content={ title } />
      <meta name='twitter:description' content={ subtitle } />
      <meta name='twitter:image' content={ websiteUrl + '/assets/pwa-icons/android-chrome-192x192.png' } />

      <meta property='og:type' content='website' />
      <meta property='og:title' content={ title } />
      <meta property='og:description' content={ subtitle } />
      <meta property='og:site_name' content={ title } />
      <meta property='og:url' content={ websiteUrl } />
      <meta property='og:image' content={ websiteUrl + '/assets/pwa-icons/apple-touch-icon.png' }/>

      <link rel='apple-touch-startup-image' href='/assets/splash-screens/apple_splash_2048.png' sizes='2048x2732' />
      <link rel='apple-touch-startup-image' href='/assets/splash-screens/apple_splash_1668.png' sizes='1668x2224' />
      <link rel='apple-touch-startup-image' href='/assets/splash-screens/apple_splash_1536.png' sizes='1536x2048' />
      <link rel='apple-touch-startup-image' href='/assets/splash-screens/apple_splash_1125.png' sizes='1125x2436' />
      <link rel='apple-touch-startup-image' href='/assets/splash-screens/apple_splash_1242.png' sizes='1242x2208' />
      <link rel='apple-touch-startup-image' href='/assets/splash-screens/apple_splash_750.png' sizes='750x1334' />
      <link rel='apple-touch-startup-image' href='/assets/splash-screens/apple_splash_640.png' sizes='640x1136' />
    </>
  )
};

export default SeoHeader;