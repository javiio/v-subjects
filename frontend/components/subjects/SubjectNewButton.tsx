import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Box, Text } from '@mantine/core';
import { Icon } from '@/components/core-ui';
import { SubjectForm } from '@/components/subjects';

export const SubjectNewButton = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box>
      <Modal
        opened={opened}
        onClose={close}
        title="Create a new Subject"
        closeButtonProps={{ radius: 'xl' }}
      >
        <SubjectForm close={close} />
      </Modal>

      <Button
        onClick={open}
        radius="xl"
        leftSection={<Icon name="plus" />}
        size="md"
      >
        <Text>Add New</Text>
      </Button>
    </Box>
  );
};
