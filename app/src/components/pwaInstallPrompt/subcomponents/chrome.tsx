import PWABaseInstallProps from './base';

const PwaInstallPromptChrome = ({ lang }: { lang: string }) => {
  return (
    <PWABaseInstallProps
      data={{
        en: [
          'At the top right of the address bar',
          `Click Install ( in case install isn't displayed there please wait until application data has been downloaded )`
        ],
        fa: [
          'در بالا سمت چپ نوار نشانی، روی «نصب»  کلیک کنید',
          'روی Install کلیک کنید (در صورتی که نصب در آنجا نمایش داده نشود، لطفا صبر کنید تا اطلاعات برنامه دانلود شود)'
        ],
        de: [
          'Klicken Sie rechts oben in der Adressleiste auf "Installieren"',
          'Klicken Sie auf „Installieren“ (falls „Installieren“ dort nicht angezeigt wird, warten Sie bitte, bis die Anwendungsdaten heruntergeladen wurden.)'
        ]
      }}
      defaultLang='en'
      img={{
        alt: 'install guide',
        aspectRatio: '344/82',
        src: '/assets/guide/chrome.png'
      }}
      lang={lang}
    />
  );
};

export default PwaInstallPromptChrome;
