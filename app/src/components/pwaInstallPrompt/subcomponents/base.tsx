// mantine
import { List, useMantineTheme } from '@mantine/core';

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
    <article>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img 
          src={ img.src } 
          alt={ img.alt } 
          loading='lazy' 
          style={{ 
            aspectRatio: img.aspectRatio + '! important',
            width: '25vw',
            objectFit: 'scale-down',
            borderRadius: t.radius.md, 
            overflow: 'hidden' 
          }}
          />
      </div>
      <List size='lg' mt='xl'>
        {
          (data.hasOwnProperty(lang) ? data[lang] : data[defaultLang]).map(i => <List.Item key={ i }>{ i }</List.Item>)
        }
      </List>
    </article>
  )
};

export default PWABaseInstallProps