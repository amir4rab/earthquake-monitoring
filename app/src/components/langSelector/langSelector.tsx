// mantine components
import { Select } from '@mantine/core';

// react-i18next
import { useTranslation } from 'react-i18next';

// icons
import { IoLanguage } from 'react-icons/io5';

const LangSelector = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation('common');

  const changeLang = (nLang: string) => i18n.changeLanguage(nLang);

  return (
    <Select
      label={t('language')}
      icon={<IoLanguage />}
      value={i18n.language}
      onChange={(nLang) => nLang && changeLang(nLang)}
      zIndex={1002}
      styles={(t) => ({
        dropdown: {
          background: t.colors.dark[5],
          borderColor: t.colors.dark[3]
        },
        item: {
          background: t.colors.dark[5],
          color: t.white,
          ['&:hover']: {
            background: t.colors.dark[4]
          },
          ['&[data-hovered]']: {
            background: t.colors.dark[4]
          }
        },
        selected: { background: t.colors.dark[0], color: t.colors.dark[7] },
        defaultVariant: { background: t.colors.dark[9] },
        withIcon: { color: t.white, borderColor: t.colors.dark[3] },
        input: { background: 'transparent' },
        label: { color: t.white }
      })}
      data={[
        {
          value: 'en',
          label: 'English'
        },
        {
          value: 'fa',
          label: 'فارسی'
        },
        {
          value: 'de',
          label: 'Deutsch'
        }
      ]}
    />
  );
};

export default LangSelector;
