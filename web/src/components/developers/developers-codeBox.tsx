import React, { ReactNode } from 'react';

// prisma
import { TabsProps, Tabs } from '@mantine/core';
import { Prism, PrismProps } from '@mantine/prism';

// types
type CodeItem = {
  title: string;
  icon: ReactNode;
  data: string;
  id: string;
  language: PrismProps['language'];
};

export interface DevelopersCodeBoxProps {
  data: CodeItem[];
  tabsProps?: TabsProps;
}
/**
 * Displays a list of code
 */
const DevelopersCodeBox = ({ tabsProps, data }: DevelopersCodeBoxProps) => {
  return (
    <Tabs my='xl' variant='pills' defaultValue={data[0].id} {...tabsProps}>
      <Tabs.List>
        {data.map(({ title, id, icon }, i) => (
          <Tabs.Tab value={id} key={id} icon={icon}>
            {title}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {data.map(({ id, data, language }) => (
        <Tabs.Panel pt='xl' value={id} key={id}>
          <Prism
            radius='md'
            colorScheme='dark'
            withLineNumbers
            language={language}>
            {data}
          </Prism>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

export default DevelopersCodeBox;
