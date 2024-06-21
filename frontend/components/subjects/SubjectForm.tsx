import React, { useState, useEffect } from 'react';
import { Button, TextInput, InputBase, Flex, Group, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useSubjects, type UnsavedSubject } from '@/hooks';
import { Icon, SexSelector } from '@/components/core-ui';
import { SubjectStatusSelector } from '@/components/subjects';
import { Sex, Status, Subject } from './types';
import classes from './SubjectForm.module.css';

interface SubjectFormProps {
  subject?: Subject;
  close: () => void;
}

export const SubjectForm = ({ subject, close }: SubjectFormProps) => {
  const { createSubject, updateSubject, error, isSaveLoading } = useSubjects();
  const [name, setName] = useState(subject?.name ?? '');
  const [sex, setSex] = useState<Sex | undefined>(subject?.sex ?? undefined);
  const [diagnosisDate, setDiagnosisDate] =
    useState<Date | undefined>(subject?.diagnosisDate ?? undefined);
  const [status, setStatus] = useState<Status | undefined>(subject?.status ?? undefined);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(isFormInvalid());
  }, [name, sex, diagnosisDate, status]);

  const isFormInvalid = () => (name.trim() === '' || !sex || !diagnosisDate || !status);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (isFormInvalid()) {
      return;
    }

    if (subject) {
      await updateSubject({ id: subject.id, name, sex, diagnosisDate, status } as Subject);
    } else {
      await createSubject({ name, sex, diagnosisDate, status } as UnsavedSubject);
    }
    close();
  };

  return (
    <form onSubmit={handleSubmit}>
      {subject && (
        <Group mb="sm" align="flex-start" gap="xs">
          <Text className={classes.label}>ID:</Text>
          <Text c="dimmed" fw="700">{subject.id}</Text>
        </Group>
      )}

      <TextInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Name"
        placeholder="Insert Name..."
        data-autofocus
        classNames={{ label: classes.label, input: classes.input }}
      />

      <InputBase
        component="div"
        label="Sex"
        classNames={{ label: classes.label, input: classes.sexInput }}
      >
        <SexSelector value={sex} onChange={setSex} />
      </InputBase>

      <DatePickerInput
        value={diagnosisDate}
        onChange={(e) => setDiagnosisDate(e as Date)}
        label="Diagnosis Date"
        placeholder="Select a date..."
        leftSection={<Icon name="calendar" size={18} />}
        classNames={{ label: classes.label, input: classes.input }}
      />

      <InputBase
        component="div"
        label="Status"
        rightSection={<Icon name="selector" />}
        classNames={{ label: classes.label, input: classes.statusInput }}
        rightSectionPointerEvents="none"
      >
        <SubjectStatusSelector value={status} onChange={setStatus} />
      </InputBase>

      <Flex gap="md" justify="flex-end" mt="lg">
        <Button
          onClick={close}
          variant="white"
          radius="xl"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          radius="xl"
          disabled={isDisabled}
          loading={isSaveLoading}
        >
          {error
            ? 'Try again'
            : subject ? 'Update' : 'Create'
          }
        </Button>
      </Flex>
    </form>
  );
};
