import PWABaseInstallProps from "./base";

const PWAInstallPromptIos = ({ lang }:{ lang: string }) => {
  return (
    <PWABaseInstallProps 
      data={{
        en: [
          'Click on the button displayed at the image', 'Scroll down and click on "Add to Home Screen"'
        ],
        fa: [
          'روی دکمه نمایش داده شده در تصویر کلیک کنید', 'به پایین اسکرول کنید و روی "افزودن به صفحه اصلی" کلیک کنید.'
        ],
        de: [
          'Klicken Sie auf die im Bild angezeigte Schaltfläche', 'Scrollen Sie nach unten und klicken Sie auf "Zum Startbildschirm hinzufügen"'
        ]
      }}
      defaultLang='en'
      img={{
        alt: 'install guide',
        aspectRatio: '375/812',
        src: '/assets/guide/ios.png'
      }}
      lang={ lang }
    />
  );
};

export default PWAInstallPromptIos;