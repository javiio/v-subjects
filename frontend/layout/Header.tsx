'use client';

import React from 'react';
import { Container, Group, Image } from '@mantine/core';
import { Spotlight } from '@/components/core-ui';
import classes from './Header.module.css';

export const Header = () => (
  <header className={classes.header}>
    <Container size="xl" className={classes.inner}>
      <Group justify="space-between" w="100%">
        <Image src="/vial_logo.svg" />
        <Spotlight />
      </Group>
    </Container>
  </header>
  );
