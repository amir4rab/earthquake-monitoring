import React, { ReactNode } from 'react';

// mantine
import { TextInput, TextInputProps } from '@mantine/core';

export interface SearchInputProps extends TextInputProps {
  searchQuery: string;
  placeHolder?: string;
  icon?: ReactNode;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}
const SearchInput = ({
  searchQuery,
  placeHolder,
  icon,
  setSearchQuery,
  ...props
}: SearchInputProps) => {
  return (
    <TextInput
      styles={(t) => ({
        icon: {
          right: t.dir === 'rtl' ? 0 : 'auto',
          left: t.dir === 'ltr' ? 0 : 'auto'
        },
        withIcon: {
          paddingRight: t.dir === 'rtl' ? t.spacing.xl * 1.5 : t.spacing.sm,
          paddingLeft: t.dir === 'ltr' ? t.spacing.xl * 1.5 : t.spacing.sm,
          textAlign: t.dir === 'ltr' ? 'left' : 'right'
        }
      })}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      width='100%'
      mb='xl'
      radius='xl'
      placeholder={placeHolder}
      icon={icon}
      {...props}
    />
  );
};

export default SearchInput;
