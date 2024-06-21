import React from 'react';
import { Sort } from '@/components/core-ui';
import { useSubjects } from '@/hooks';

const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'sex', label: 'Sex' },
  { value: 'diagnosisDate', label: 'Diagnosis Date' },
  { value: 'status', label: 'Status' },
];

export const SubjectListSort = () => {
  const { sort, setSort, isLoading } = useSubjects();

  return (
    <Sort
      options={SORT_OPTIONS}
      sort={sort}
      setSort={setSort}
      disabled={isLoading}
    />
  );
};
