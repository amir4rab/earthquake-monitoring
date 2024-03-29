import React from 'react';

// mantine
import { ActionIcon } from '@mantine/core';

// colorscheme selector
import { createStyles, useMantineColorScheme } from '@mantine/core';

// icons
import { IoSunny, IoMoon } from 'react-icons/io5';

// react-i18next
import { useTranslation } from 'react-i18next';

const useStyles = createStyles((t) => ({
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: t.spacing.md
  },
  text: {
    marginRight: t.spacing.md,
    color: t.white
  }
}));

const ThemeSelector = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { t } = useTranslation('common');
  const { classes } = useStyles();

  return (
    <div className={classes.buttonWrapper}>
      <p className={classes.text}>
        {colorScheme === 'dark' ? t('light-mode') : t('dark-mode')}
      </p>
      <ActionIcon
        onClick={() => toggleColorScheme()}
        aria-label={colorScheme === 'dark' ? t('light-mode') : t('dark-mode')}>
        {colorScheme === 'dark' ? <IoSunny /> : <IoMoon />}
      </ActionIcon>
    </div>
  );
};

export default ThemeSelector;
