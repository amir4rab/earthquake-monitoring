import React, { ReactNode } from 'react';

// mantine
import { Anchor, Center, Text } from '@mantine/core';

// translate
import Trans from 'next-translate/Trans';

// next
import Link from 'next/link';

// components
import Error from './error';

const NextLink = ({
  children,
  href
}: {
  children?: ReactNode;
  href: string;
}) => (
  <Link passHref href={href}>
    <Anchor>{children}</Anchor>
  </Link>
);

const NotFound = () => (
  <Error
    titleKey='common:notFound'
    subtitleKey='common:notFoundSubtitle'
    errorCode='404'>
    <Center sx={{ minHeight: '50vh' }}>
      <Text>
        <Trans
          i18nKey='common:notFoundText'
          components={[
            <NextLink href='/' key='home' />,
            <Anchor
              target='_blank'
              rel='noreferrer'
              href={process.env.NEXT_PUBLIC_GITHUB_URL + '/issues'}
              key='github'
            />
          ]}
        />
      </Text>
    </Center>
  </Error>
);

export default NotFound;
