'use client';

import React from 'react';
import { Text, Group, rem } from '@mantine/core';
import { Icon, Icons } from '@/components/core-ui';
import { Status } from './types';

interface SubjectStatusPillProps {
  status: Status | string;
  pill?: boolean;
}

const STATUS_OPTIONS = [
  { status: Status.IN_SCREENING, label: 'In screening', color: 'yellow', icon: 'statusInScreening' },
  { status: Status.ENROLLED, label: 'Enrolled', color: 'green', icon: 'statusEnrolled' },
  { status: Status.FAILED, label: 'Failed', color: 'red', icon: 'statusFailed' },
];

export const SubjectStatusPill = ({ status, pill }: SubjectStatusPillProps) => {
  const statusOption = STATUS_OPTIONS.find((option) => option.status === status)!;

  if (!statusOption) {
    return null;
  }

  return (
    <Group
      gap={8}
      style={pill ? {
          border: `1px solid var(--mantine-color-${statusOption.color}-6)`,
          backgroundColor: `var(--mantine-color-${statusOption.color}-0)`,
          padding: `${rem(2)} ${rem(12)}`,
          display: 'inline-flex',
          borderRadius: rem(32),
          textTransform: 'uppercase',
        } : { padding: rem(4), border: '1px solid transparent' }
      }
    >
      <Icon
        name={statusOption.icon as keyof typeof Icons}
        color={`var(--mantine-color-${statusOption.color}-5)`}
        size={pill ? 18 : 21}
      />
      <Text
        size={pill ? 'sm' : 'md'}
        c={pill
          ? `var(--mantine-color-${statusOption.color}-9)`
          : 'var(--mantine-color-gray-9)'
        }
      >
        {statusOption.label}
      </Text>
    </Group>
  );
};
