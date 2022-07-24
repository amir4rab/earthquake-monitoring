import React from 'react';

// mantine components
import { Select } from '@mantine/core';

// next-translate
import useTranslation from 'next-translate/useTranslation';

// next
import { useRouter } from 'next/router';

// icons
import { IoLanguage } from 'react-icons/io5';

const LangSelector = () => {
  const { lang } = useTranslation();
  const { replace } = useRouter();
  const { t } = useTranslation('common');

  const changeLang = ( nLang: string ) => {
    replace('', '', { locale: nLang });
    document.getElementsByTagName('html')[0].setAttribute('dir', nLang === 'fa' || nLang === 'ar'  ? 'rtl' : 'ltr');
  }

  return (
    <Select
      label={ t('language') }
      icon={ <IoLanguage /> }
      value={ lang }
      onChange={ (nLang) => nLang && changeLang(nLang) }
      styles={(t) => ({
        dropdown: { background: t.colors.dark[5], borderColor: t.colors.dark[3] },
        item: { background: t.colors.dark[5], color: t.white, textAlign: t.dir === 'ltr' ? 'left' : 'right' },
        hovered: { background: t.colors.dark[4] },
        selected: { background: t.colors.dark[0], color: t.colors.dark[7] },
        defaultVariant: { background: t.colors.dark[9] },
        withIcon: { color: t.white, borderColor: t.colors.dark[3], textAlign: t.dir === 'ltr' ? 'left' : 'right' },
        input: { background: 'transparent' },
        label: { color: t.white },
      })}
      data={[
        {
          value: 'en',
          label: 'English',
        },
        {
          value: 'fa',
          label: 'فارسی',
        },
        {
          value: 'de',
          label: 'Deutsch',
        }
      ]}
    />
  )
}

export default LangSelector;