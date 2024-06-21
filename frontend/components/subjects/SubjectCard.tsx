'use client';

import React from 'react';
import dayjs from 'dayjs';
import { Paper, Grid, Text, Group } from '@mantine/core';
import { SubjectStatusPill, SubjectCardActions } from '@/components/subjects';
import { Sex, type Subject } from './types';
import { Icon } from '../core-ui';

interface SubjectCardProps {
  subject: Subject;
}

const CardTitle = ({ children }: { children: string }) => (
  <Text c="var(--mantine-color-gray-5)" fw={700} tt="uppercase" size="sm">
    {children}
  </Text>
);

export const SubjectCard = ({ subject }: SubjectCardProps) => (
  <Paper p="xl" mb="xl" shadow="sm" radius="sm" pos="relative">
    <SubjectCardActions subject={subject} />

    <Grid>
      <Grid.Col span={{ base: 2, xs: 2, sm: 2, md: 1, lg: 1 }}>
        <CardTitle>Id</CardTitle>
        <Text size="md">{subject.id}</Text>
      </Grid.Col>

      <Grid.Col span={{ base: 10, xs: 10, sm: 10, md: 4, lg: 4 }}>
        <CardTitle>Name</CardTitle>
        <Text size="md">{subject.name}</Text>
      </Grid.Col>

      <Grid.Col span={{ base: 4, xs: 3, sm: 3, md: 2, lg: 2 }}>
        <CardTitle>Sex</CardTitle>
        <Group gap={2}>
          <Icon
            name={subject.sex === Sex.MALE ? 'male' : 'female'}
            color={`var(--mantine-color-${subject.sex === Sex.MALE ? 'blue' : 'pink'}-3)`}
            size={19}
            stroke={1}
          />
          <Text size="md">{subject.sex}</Text>
        </Group>
      </Grid.Col>

      <Grid.Col span={{ base: 8, xs: 4, sm: 4, md: 2, lg: 2 }}>
        <CardTitle>Diagnosis Date</CardTitle>
        <Text size="md">{dayjs(subject.diagnosisDate).format('MMM DD, YYYY')}</Text>
      </Grid.Col>

      <Grid.Col span={{ base: 12, xs: 5, sm: 5, md: 3, lg: 3 }}>
        <CardTitle>Status</CardTitle>
        <SubjectStatusPill status={subject.status} pill />
      </Grid.Col>
    </Grid>
  </Paper>
);
