import React from 'react';
import { useDebouncedCallback } from '@mantine/hooks';
import { Button, Combobox, Group, ActionIcon, useCombobox, Input, InputBase } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { Icon } from '@/components/core-ui';

export interface Filter<T = any> {
  id: string;
  label: string;
  value?: any;
  type?: 'text' | 'date-range';
  isInUse?: boolean;
  renderer?: ({ value, onChange } : { value: T, onChange: (e: T) => void }) => React.JSX.Element;
}

interface FiltersProps {
  filters: Filter[];
  setFilters: (filters: Filter[]) => void;
  setSearchFilters: (filters: Record<string, string>) => void;
}

export const Filters = ({ filters, setFilters, setSearchFilters }: FiltersProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const updateSearchFilters = useDebouncedCallback((searchFilters: Record<string, string>) => {
    setSearchFilters(searchFilters);
  }, 500);

  const onChangeFilter = (filter: Filter, value: any) => {
    // Update the filter value
    const _filters = filters.map((f) => f.id === filter.id ? { ...filter, value } : f);
    // Generate the search filters object
    const searchFilters = _filters
      .filter((f) => f.isInUse)
      .reduce(
        (prev, f) => ({ ...prev, [f.id]: f.value }),
        {} as Record<string, string>
      );

    setFilters(_filters);
    updateSearchFilters(searchFilters);
  };

  const addFilter = (filterId: string) => {
    setFilters(filters.map((f) => f.id === filterId ? { ...f, isInUse: true } : f));
  };

  const removeFilter = (filter: Filter) => {
    onChangeFilter({ ...filter, isInUse: false }, undefined);
  };

  const renderFilterInput = (filter: Filter) => {
    switch (filter.type) {
      case 'text':
        return (
          <Input
            key={filter.id}
            radius="xl"
            value={filter.value}
            placeholder={`${filter.label}...`}
            onChange={(e) => onChangeFilter(filter, e.target.value)}
            rightSection={renderRemoveFilterButton(filter)}
            rightSectionPointerEvents="all"
            w="180px"
          />
        );
      case 'date-range':
        return (
          <DatePickerInput
            key={filter.id}
            radius="xl"
            valueFormat="MMM DD"
            value={filter.value}
            onChange={(e) => onChangeFilter(filter, e)}
            leftSection={<Icon name="calendar" />}
            rightSection={renderRemoveFilterButton(filter)}
            placeholder="Date..."
            // placeholder={`${filter.label}...`}
            // type="range"
            // allowSingleDateInRange
          />
        );
      default:
        return null;
    }
  };

  const renderRemoveFilterButton = (filter: Filter) => (
    <ActionIcon
      onClick={() => removeFilter(filter)}
      variant="subtle"
      aria-label="Remove Filter"
      radius="xl"
    >
      <Icon name="x" size={18} />
    </ActionIcon>
  );

  return (
    <Group gap={2}>
      <Group gap={0}>
        <Icon name="filter" color="var(--mantine-color-blue-filled)" size={24} />
        <Icon name="chevronRight" color="var(--mantine-color-blue-filled)" stroke={1} size={24} />
      </Group>

      <Group gap={6}>
        {filters.map((filter) => {
          if (!filter.isInUse || (!filter.renderer && !filter.type)) {
            return null;
          }

          if (filter.renderer) {
            const FilterRenderer = filter.renderer;
            return (
              <InputBase
                key={filter.id}
                component="div"
                rightSection={renderRemoveFilterButton(filter)}
                radius="xl"
                styles={{ input: { padding: 0 } }}
              >
                <FilterRenderer
                  value={filter.value}
                  onChange={(value) => onChangeFilter(filter, value)}
                />
              </InputBase>
            );
          }

          return renderFilterInput(filter);
        })}

        {filters.find((f) => !f.isInUse) && (
          <Combobox
            store={combobox}
            width={250}
            position="bottom-start"
            withArrow
            withinPortal={false}
            onOptionSubmit={(filter) => {
              addFilter(filter);
              combobox.closeDropdown();
            }}
          >
            <Combobox.Target>
              <Button
                variant="outline"
                leftSection={<Icon name="plus" />}
                radius="xl"
                onClick={() => combobox.toggleDropdown()}
                size="xs"
              >
                ADD FILTER
              </Button>
            </Combobox.Target>

            <Combobox.Dropdown>
              <Combobox.Options>
                {filters.filter((f) => !f.isInUse).map((filter) => (
                  <Combobox.Option key={filter.id} value={filter.id}>
                    {filter.label}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>
        )}
      </Group>
    </Group>
  );
};

export default Filters;
