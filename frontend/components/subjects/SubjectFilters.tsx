import React, { useState } from 'react';
import { Paper } from '@mantine/core';
import { useSubjects } from '@/hooks';
import { SexSelector, Filters, type Filter } from '@/components/core-ui';
import { SubjectStatusSelector } from './SubjectStatusSelector';

const FILTERS: Filter[] = [
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'sex', label: 'Sex', renderer: SexSelector },
  { id: 'diagnosisDate', label: 'Diagnosis Date', type: 'date-range' },
  { id: 'status', label: 'Status', renderer: SubjectStatusSelector },
];

export const SubjectFilters = () => {
  const { setFilters } = useSubjects();
  const [filtersOptions, setFiltersOptions] = useState<Filter[]>(FILTERS);

  return (
    <Paper shadow="xs" radius="sm" p="sm">
      <Filters
        filters={filtersOptions}
        setFilters={setFiltersOptions}
        setSearchFilters={setFilters}
      />
    </Paper>
  );
};
