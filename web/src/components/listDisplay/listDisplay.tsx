import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

// mantine
import { Box, Table, Title } from '@mantine/core';
import { useMantineTheme } from '@mantine/styles';

// next-translate
import useTranslation from 'next-translate/useTranslation';

// icons
import { IoSearch } from 'react-icons/io5';

// components
import SearchInput from '../searchInput';

// types
export interface Content {
  header: string[];
  rows: {
    id: string;
    items: {
      el: ReactNode;
      key: string;
      value?: string;
    }[];
  }[];
}

interface Props {
  title?: string;
  content: Content;
  namespace: string;
  searchable?:
    | false
    | {
        fields: number[];
      };
}
const ListDisplay = ({
  title,
  content,
  namespace,
  searchable = false
}: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filesAreValid = useRef<null | boolean>(null);
  const { t } = useTranslation(namespace);
  const { t: commonT } = useTranslation('common');
  const { dir } = useMantineTheme();

  const filteredArray = useMemo(() => {
    // filters the content to find the included items
    if (
      filesAreValid.current !== true ||
      searchable === false ||
      searchQuery.length === 0
    )
      return content.rows;
    try {
      const formattedSearchQuery = searchQuery.toLowerCase().replace(/ /, '-');

      const filteredArray = { ...content }.rows.filter((item) => {
        let isIncluded = false;
        searchable.fields.every((key) => {
          if (
            item.items[key]?.value
              ?.toLocaleLowerCase()
              .replace(/ /, '-')
              ?.includes(formattedSearchQuery)
          ) {
            isIncluded = true;
            return false;
          }
          return true;
        });

        return isIncluded;
      });

      return filteredArray;
    } catch (err) {
      console.error(err);
      return [];
    }
  }, [searchQuery, content, searchable]);

  // validates the search fields
  useEffect(() => {
    if (filesAreValid.current !== null || searchable === false) return;

    const biggestIndex = searchable.fields.sort()[searchable.fields.length - 1];
    if (biggestIndex > content.header.length - 1) {
      console.error(
        `Couldn't found index "${biggestIndex}", please recheck your searchable fields`
      );
      filesAreValid.current = false;
    } else {
      filesAreValid.current = true;
    }
  }, [content.header.length, searchable]);

  return (
    <Box>
      {title && (
        <Title mb='xl' order={3}>
          {title}
        </Title>
      )}
      {searchable !== false && (
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          width='100%'
          mb='xl'
          radius='xl'
          placeholder={commonT('search')}
          icon={<IoSearch />}
        />
      )}
      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <Table striped highlightOnHover>
          <thead>
            <tr>
              {content.header.map((i) => (
                <th
                  style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}
                  key={i}>
                  {t(i)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredArray.map(({ id, items }) => (
              <tr key={id}>
                {items.map((i) => (
                  <td key={i.key}>{i.el}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default ListDisplay;
