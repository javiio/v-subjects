import React from 'react';
import { Group, Text, Select, ActionIcon } from '@mantine/core';
import classes from './Sort.module.css';
import { Icon } from './Icon';

interface SortProps {
  options: { value: string; label: string }[];
  sort: { sortBy?: string; sortOrder: 'asc' | 'desc' }
  setSort: (value: { sortBy?: string; sortOrder: 'asc' | 'desc' }) => void;
  disabled?: boolean;
}

export const Sort = ({ options, sort, setSort, disabled }: SortProps) => {
  const { sortBy, sortOrder } = sort;

  return (
    <Group gap={8}>
      <Text c="dimmed" size="sm" mt={4}>SORT BY:</Text>
      <Select
        data={options}
        value={sortBy}
        onChange={(value) => setSort({ ...sort, sortBy: value || undefined })}
        variant="unstyled"
        classNames={{ root: classes.root, input: classes.input }}
        clearable
        disabled={disabled}
      />
      <ActionIcon
        onClick={() => setSort({ ...sort, sortOrder: sortOrder === 'asc' ? 'desc' : 'asc' })}
        variant="default"
        aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
        disabled={disabled}
      >
        <Icon name={sortOrder === 'asc' ? 'sortAsc' : 'sortDesc'} />
      </ActionIcon>

    </Group>
  );
};
