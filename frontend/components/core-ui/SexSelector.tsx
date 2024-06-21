import React from 'react';
import { Radio, Group, Text, Flex, rem } from '@mantine/core';
import { Icon } from '@/components/core-ui';
import { Sex } from '../subjects/types';
import classes from './SexSelector.module.css';

interface SexSelectorProps {
  value: Sex | undefined;
  onChange: (s: Sex) => void;
}

export const SexSelector = ({ value, onChange }: SexSelectorProps) => (
  <Radio.Group
    value={value}
    onChange={(val) => onChange(val as Sex)}
    display="flex"
    m={rem(2)}
    style={{ minWidth: rem(264) }}
  >
    <Flex gap={2}>
      <Radio.Card
        className={`${classes.radioCard} ${classes.maleCard}`}
        value={Sex.MALE}
      >
        <Group wrap="nowrap" gap={6}>
          <Radio.Indicator />
          <Group wrap="nowrap" gap={2}>
            <Icon name="male" size={24} />
            <Text>Male</Text>
          </Group>
        </Group>
      </Radio.Card>
      <Radio.Card
        className={`${classes.radioCard} ${classes.femaleCard}`}
        value={Sex.FEMALE}
      >
        <Group wrap="nowrap" gap={6}>
          <Radio.Indicator />
          <Group wrap="nowrap" gap={2}>
            <Icon name="female" size={24} />
            <Text>Female</Text>
          </Group>
        </Group>
      </Radio.Card>
    </Flex>
  </Radio.Group>
);
