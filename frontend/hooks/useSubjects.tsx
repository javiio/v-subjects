import React, { useEffect, useState, useContext, createContext } from 'react';
import dayjs from 'dayjs';
import { notifications } from '@mantine/notifications';
import { useApi } from './useApi';
import { useSpotlight } from './useSpotlight';
import type { Subject } from '../components/subjects/types';

export interface UnsavedSubject extends Omit<Subject, 'id'> {}

interface SubjectsContextValue {
  fetchSubjects: () => Promise<void>;
  subjects: Subject[];
  total: number;
  createSubject: (subject: UnsavedSubject) => Promise<void>;
  updateSubject: (subject: Subject) => Promise<void>;
  deleteSubject: (subject: Subject) => Promise<void>;
  filters: Record<string, string> | undefined;
  setFilters: React.Dispatch<Record<string, string>>;
  sort: { sortBy?: string; sortOrder: 'asc' | 'desc' };
  setSort: React.Dispatch<{ sortBy?: string; sortOrder: 'asc' | 'desc' }>;
  isLoading: boolean;
  isSaveLoading: boolean;
  error?: string | null;
}

const SubjectsContext = createContext<SubjectsContextValue>({
  fetchSubjects: async () => {},
  subjects: [],
  total: 0,
  createSubject: async () => {},
  updateSubject: async () => {},
  deleteSubject: async () => {},
  filters: {},
  setFilters: () => {},
  sort: { sortOrder: 'desc' },
  setSort: () => {},
  isLoading: false,
  isSaveLoading: false,
});

const PAGE_SIZE = 10;

export const ProvideSubjects = ({ children }: { children: React.ReactNode }) => {
  const api = useApi();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [filters, setFilters] = useState<Record<string, string>>();
  const [sort, setSort] = useState<{ sortBy?: string; sortOrder: 'asc' | 'desc' }>({ sortOrder: 'desc' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setSpotlightActions } = useSpotlight();

  useEffect(() => {
    fetchSubjects({ fetchInitialPage: true });
  }, [filters, sort]);

  // Update spotlight actions with all fetched subjects
  useEffect(() => {
    const spotlightActions = subjects.map((subject) => ({
      id: `subject-${subject.id}`,
      label: subject.name,
      description: `${subject.sex} | ${dayjs(subject.diagnosisDate).format('MMM DD, YYYY')} | ${subject.status}`,
    }));

    setSpotlightActions(spotlightActions);
  }, [subjects]);

  const responseDataToSubjects = (subjectsData: any): Subject[] =>
    subjectsData.map((subject: any) => ({
      ...subject,
      diagnosisDate: new Date(subject.diagnosisDate),
    }));

  const fetchSubjects = async (
    { fetchInitialPage }: { fetchInitialPage?: boolean } = {}
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get('subjects', {
        params: {
          ...filters,
          ...sort,
          skip: fetchInitialPage ? 0 : (page + 1) * PAGE_SIZE,
          take: PAGE_SIZE,
        },
      });

      const newSubjects = responseDataToSubjects(response.data.subjects);
      setSubjects((prev) => fetchInitialPage
        ? newSubjects
        : [...prev, ...newSubjects]);

      setPage((prev) => fetchInitialPage ? 0 : prev + 1);
      setTotal(response.data.total);
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error('Error', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createSubject = async (subject: UnsavedSubject) => {
    setIsSaveLoading(true);
    setError(null);
    try {
      await api.post('/subjects', subject);
      fetchSubjects({ fetchInitialPage: true });

      notifications.show({
        title: 'Subject created!',
        message: `${subject.name} was successfully created.`,
        color: 'green',
      });
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error('Error', err);
      setError(err.message);
      notifications.show({
        title: 'Failed to create Subject!',
        message: 'Subject could not be created, please try again',
        color: 'red',
      });
    } finally {
      setIsSaveLoading(false);
    }
  };

  const updateSubject = async (subject: Subject) => {
    setIsSaveLoading(true);
    setError(null);
    try {
      await api.put(`/subjects/${subject.id}`, subject);
      // We don't need to fetch all subjects again, we can just update the one that was changed.
      // That way we avoid re-rendering the whole list and losing the current scroll position
      setSubjects((prev) => prev.map((s) => (s.id === subject.id ? subject : s)));

      notifications.show({
        title: 'Subject updated!',
        message: `${subject.name} was successfully updated.`,
        color: 'green',
      });
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error('Error', err);
      setError(err.message);
      notifications.show({
        title: 'Failed to update Subject!',
        message: 'Subject could not be updated, please try again',
        color: 'red',
      });
    } finally {
      setIsSaveLoading(false);
    }
  };

  const deleteSubject = async (subject: Subject) => {
    setIsSaveLoading(true);
    setError(null);
    try {
      await api.delete(`/subjects/${subject.id}`);
      setSubjects((prev) => prev.filter((s) => s.id !== subject.id));

      notifications.show({
        title: 'Subject deleted!',
        message: `${subject.name} was successfully deleted.`,
        color: 'green',
      });
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error('Error', err);
      setError(err.message);
      notifications.show({
        title: 'Failed to delete Subject!',
        message: 'Subject could not be deleted, please try again',
        color: 'red',
      });
    } finally {
      setIsSaveLoading(false);
    }
  };

  const value = {
    fetchSubjects,
    subjects,
    total,
    createSubject,
    updateSubject,
    deleteSubject,
    filters,
    setFilters,
    sort,
    setSort,
    isLoading,
    isSaveLoading,
    error,
  };

  return (
    <SubjectsContext.Provider value={value}>{children}</SubjectsContext.Provider>
  );
};

export const useSubjects = () => useContext(SubjectsContext);
