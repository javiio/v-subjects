import React from 'react';
import { Button, Text, rem } from '@mantine/core';
import { Spotlight as CoreSpotlight } from '@mantine/spotlight';
import { useSpotlight } from '@/hooks';
import { Icon } from '@/components/core-ui';

export const Spotlight = () => {
  const { actions, openSpotlight } = useSpotlight();

  return (
    <>
      <Button
        onClick={openSpotlight}
        variant="white"
        radius="xl"
        size="md"
        leftSection={<Icon name="search" />}
        color="gray"
        bd="1px solid var(--mantine-color-gray-3)"
      >
        <Text
          fw="normal"
          size="lg"
          mr={rem(200)}
          c="var(--mantine-color-gray-5)"
        >
          Search...
        </Text>
      </Button>

      <CoreSpotlight
        actions={actions}
        nothingFound="Nothing found..."
        highlightQuery
        searchProps={{
          leftSection: <Icon name="search" />,
          placeholder: 'Search...',
        }}
      />
    </>
  );
};
