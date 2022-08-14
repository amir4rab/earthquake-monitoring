// mantine
import { TypographyStylesProvider, useMantineTheme } from '@mantine/core';

interface Props {
  data: {
    [ v: string ]: string[]
  };
  lang: string;
  defaultLang: string;
  img: { 
    src: string;
    aspectRatio: string;
    alt: string;
  }
};

const PWABaseInstallProps = ({ lang, data, defaultLang, img }: Props ) => {
  const t = useMantineTheme();

  return (
    <TypographyStylesProvider>
      <article>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={ img.src } alt={ img.alt } loading='lazy' style={{ aspectRatio: img.aspectRatio, borderRadius: t.radius.md, overflow: 'hidden' }} />
        </div>
        <ol>
          {
            (data.hasOwnProperty(lang) ? data[lang] : data[defaultLang]).map(i => <li key={ i }>{ i }</li>)
          }
        </ol>
      </article>
    </TypographyStylesProvider>
  )
};

export default PWABaseInstallProps