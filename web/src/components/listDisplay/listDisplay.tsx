import React, { useEffect, useState, useMemo } from 'react';

// mantine
import { Box, Table, Text, Title } from '@mantine/core';
import { useMantineTheme } from '@mantine/styles';

// next-translate
import useTranslation from 'next-translate/useTranslation';

// icons
import { IoSearch } from 'react-icons/io5';

// components
import SearchInput from '../searchInput';

// next
import Link from 'next/link';

// utils
import { getDate, getHour } from '../listDisplay/listDisplay-utils';

// types
interface RowsInterface {
  id: string;
  state: number;
  mag: number;
  dep: number;
  city: {
    fa: string;
    en: string;
  };
  date: number;
}

type RowsInterfaceFiles = 'state' | 'mag' | 'dep' | 'city' | 'date';

export interface Content {
  header: string[];
  rows: RowsInterface[];
}

interface Props {
  title?: string;
  content: Content;
  namespace: string;
  searchable?:
    | false
    | {
        fields: RowsInterfaceFiles[];
      };
}
const ListDisplay = ({
  title,
  content,
  namespace,
  searchable = false
}: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ssr, setSrr] = useState(true);
  const { t } = useTranslation(namespace);
  const { t: statesT, lang } = useTranslation('states');
  const { t: commonT } = useTranslation('common');
  const { dir } = useMantineTheme();

  useEffect(() => {
    if (typeof window !== 'undefined') setSrr(false);
  }, []);

  const filteredArray = useMemo(() => {
    // filters the content to find the included items
    if (searchable === false || searchQuery.length === 0) return content.rows;
    try {
      const formattedSearchQuery = searchQuery.toLowerCase().replace(/ /, '-');

      const filteredArray = { ...content }.rows.filter((item) => {
        let isIncluded = false;
        searchable.fields.every((key) => {
          switch (key) {
            case 'city': {
              // checking if the city name is included in search query
              if (
                item[key][lang === 'fa' ? 'fa' : 'en']
                  ?.toLocaleLowerCase()
                  .replace(/ /, '-')
                  ?.includes(formattedSearchQuery)
              ) {
                isIncluded = true;
                return false;
              }
              return true;
            }
            case 'state': {
              // checking if the state name is included in search query
              if (
                statesT(item[key] + '')
                  ?.toLocaleLowerCase()
                  .replace(/ /, '-')
                  ?.includes(formattedSearchQuery)
              ) {
                isIncluded = true;
                return false;
              }
              return true;
            }
            default: {
              // checking for every other field
              if ((item[key] + '').includes(formattedSearchQuery)) {
                isIncluded = true;
                return false;
              }
              return true;
            }
          }
        });

        return isIncluded;
      });

      return filteredArray;
    } catch (err) {
      console.error(err);
      return [];
    }
  }, [searchQuery, content, searchable, lang, statesT]);

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
            {filteredArray.map(({ city, date, dep, mag, state, id }) => (
              <tr key={id}>
                <td>
                  <Link href={`/states/${state}`} passHref>
                    <Text component='a' size='sm'>
                      {statesT(state + '')}
                    </Text>
                  </Link>
                </td>
                <td>
                  <Text
                    sx={(t) =>
                      mag > 4
                        ? {
                            color:
                              t.colorScheme === 'dark'
                                ? t.colors.red[9]
                                : '#ff0000',
                            fontWeight: 'bold'
                          }
                        : {}
                    }
                    size='sm'>
                    {mag.toLocaleString(lang)}
                  </Text>
                </td>
                <td>
                  <Text size='sm'>
                    {dep.toLocaleString(lang) +
                      (lang !== 'fa' && lang !== 'ar' ? ' Km' : ' کلیومتر')}
                  </Text>
                </td>
                <td>
                  <Text size='sm'>{lang === 'fa' ? city.fa : city.en}</Text>
                </td>
                <td>
                  <Text size='sm'>
                    {getDate(date as unknown as number, ssr, lang)}
                  </Text>
                </td>
                <td>
                  <Text size='sm'>
                    {getHour(date as unknown as number, ssr, lang)}
                  </Text>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default ListDisplay;
