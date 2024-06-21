'use client';

import React from 'react';
import { Combobox, Input, useCombobox, UnstyledButton, rem } from '@mantine/core';
import { SubjectStatusPill } from './SubjectStatusPill';
import { Status } from './types';

interface SubjectStatusSelectorProps {
  value: Status | undefined;
  onChange: (s: Status) => void;
}

export const SubjectStatusSelector = ({ value, onChange }: SubjectStatusSelectorProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        onChange(val as Status);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <UnstyledButton
          onClick={() => combobox.toggleDropdown()}
          variant="transparent"
          style={{ minWidth: rem(170), height: '100%', width: '100%', padding: '0 8px' }}
        >
          {value
            ? <SubjectStatusPill status={value} />
            : <Input.Placeholder>Select a status...</Input.Placeholder>
          }
        </UnstyledButton>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {Object.keys(Status).map((status) => (
            <Combobox.Option value={status} key={status} px={1}>
              <SubjectStatusPill status={status} />
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
