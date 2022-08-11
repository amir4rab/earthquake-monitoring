const websiteUrl = 'https://earthquake-monitoring-amir4rab.com';

interface Props {
  title: string;
  subtitle: string;
  lang: string;
}
/**
 * Adds pwa headers and open graph headers
 */
const SeoHeader = ({ title, subtitle, lang }: Props) => {
  return (
    <>
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
      <meta property='og:image' content={ websiteUrl + `/assets/banners/banner-${lang}.jpg` }/>

      <link 
        href='/pwa/iphone5_splash.png'
        media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)' 
        rel='apple-touch-startup-image' 
      />
      <link 
        href='/pwa/iphone6_splash.png'
        media='(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)' 
        rel='apple-touch-startup-image' 
      />
      <link 
        href='/pwa/iphoneplus_splash.png'
        media='(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)' 
        rel='apple-touch-startup-image' 
      />
      <link 
        href='/pwa/iphonex_splash.png'
        media='(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)' 
        rel='apple-touch-startup-image' 
      />
      <link 
        href='/pwa/iphonexr_splash.png'
        media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)' 
        rel='apple-touch-startup-image' 
      />
      <link 
        href='/pwa/iphonexsmax_splash.png'
        media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)' 
        rel='apple-touch-startup-image' 
      />
      <link 
        href='/pwa/ipad_splash.png'
        media='(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)' 
        rel='apple-touch-startup-image' 
      />
      <link 
        href='/pwa/ipadpro1_splash.png'
        media='(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)' 
        rel='apple-touch-startup-image' 
      />
      <link 
        href='/pwa/ipadpro3_splash.png'
        media='(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)' 
        rel='apple-touch-startup-image' 
      />
      <link 
        href='/pwa/ipadpro2_splash.png'
        media='(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)' 
        rel='apple-touch-startup-image' 
      />
    </>
  )
};

export default SeoHeader;