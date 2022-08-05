import React, { ReactNode } from 'react';

// mantine
import { TextInput, TextInputProps } from '@mantine/core';

export interface SearchInputProps extends TextInputProps {
  searchQuery: string;
  placeHolder?: string;
  icon?: ReactNode;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};
const SearchInput = ({ searchQuery, placeHolder, icon, setSearchQuery, ...props }: SearchInputProps) => {
  return (
    <TextInput
      value={ searchQuery }
      onChange={ e => setSearchQuery(e.target.value) }
      width='100%'
      mb='xl'
      radius='xl'
      placeholder={ placeHolder }
      icon={ icon }
      { ...props }
    />
  )
};

export default SearchInput;