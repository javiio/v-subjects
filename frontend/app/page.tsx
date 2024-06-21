'use client';

import React from 'react';
import { Text, Group, Breadcrumbs } from '@mantine/core';
import { ProvideSubjects } from '@/hooks';
import { SubjectFilters, SubjectList, SubjectNewButton } from '@/components/subjects';

export default function HomePage() {
  return (
    <ProvideSubjects>
      <Group justify="space-between" mt="lg" mb="lg">
        <Breadcrumbs>
          <Text c="var(--mantine-color-gray-6)">Vial</Text>
          <Text c="var(--mantine-color-gray-7)">Subjects</Text>
        </Breadcrumbs>
        <SubjectNewButton />
      </Group>

      <SubjectFilters />

      <SubjectList />
    </ProvideSubjects>
  );
}
