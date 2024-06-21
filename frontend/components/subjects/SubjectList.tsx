import React, { useEffect } from 'react';
import { Box, Group, Text, Loader, Skeleton } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { useSubjects } from '@/hooks';
import { SubjectCard, SubjectListSort } from '@/components/subjects';

export const SubjectList = () => {
  const { subjects, total, fetchSubjects, isLoading, error } = useSubjects();
  const [scroll] = useWindowScroll();

  useEffect(() => {
    if (scroll.y + window.innerHeight >= document.documentElement.scrollHeight - 120) {
      if (!isLoading && !error && subjects.length < total) {
        fetchSubjects();
      }
    }
  }, [scroll]);

  return (
    <Box mb={180}>
      <Group justify="space-between" mt="xl" mb="xs" align="flex-end">
        <Group>
          <Text c="dimmed" px="xs">
            {total === 1 ? '1 Result found' : `${total} Results found`}
          </Text>
          {isLoading && subjects.length > 0 && <Loader color="gray" size="sm" />}
        </Group>
        <SubjectListSort />
      </Group>

      {subjects.map((subject) => (
        <SubjectCard key={subject.id} subject={subject} />
      ))}

      {isLoading && subjects.length === 0 && (
        <>
          <Skeleton height={120} mt={60} />
          <Skeleton height={120} mt="xl" />
          <Skeleton height={120} my="xl" />
        </>
      )}
    </Box>
  );
};
