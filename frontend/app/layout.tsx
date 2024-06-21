import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import './layout.css';

import React from 'react';
import { MantineProvider, Container } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ProvideSpotlight } from '@/hooks';
import { Header } from '../layout';
import { theme } from '../theme';

export const metadata = {
  title: 'Vial Subjects',
  description: 'Subject Grid Display Application',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body style={{ backgroundColor: 'var(--mantine-color-gray-0)', overflowY: 'scroll' }}>
        <MantineProvider theme={theme}>
          <ProvideSpotlight>
            <Notifications position="top-right" />
            <Header />
            <Container size="lg">
              {children}
            </Container>
          </ProvideSpotlight>
        </MantineProvider>
      </body>
    </html>
  );
}
