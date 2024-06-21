import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Box, Modal, Menu, ActionIcon } from '@mantine/core';
import { useSubjects } from '@/hooks';
import { Icon } from '@/components/core-ui';
import { SubjectForm } from '@/components/subjects';
import type { Subject } from './types';

interface SubjectCardActionsProps {
  subject: Subject;
}

export const SubjectCardActions = ({ subject }: SubjectCardActionsProps) => {
  const [openedEdit, { open, close }] = useDisclosure(false);
  const { deleteSubject } = useSubjects();

  return (
    <Box>
      <Modal
        opened={openedEdit}
        onClose={close}
        title="Edit Subject"
        closeButtonProps={{ radius: 'xl' }}
      >
        <SubjectForm subject={subject} close={close} />
      </Modal>

      <Menu withinPortal position="bottom-end" withArrow>
        <Menu.Target>
          <ActionIcon variant="subtle" color="gray" style={{ position: 'absolute', top: '8px', right: '8px' }}>
            <Icon name="more" />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<Icon name="edit" size={18} />}
            onClick={open}
          >
            Edit
          </Menu.Item>
          <Menu.Item
            leftSection={<Icon name="remove" size={18} />}
            onClick={() => deleteSubject(subject)}
          >
            Remove
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
};
