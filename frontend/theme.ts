'use client';

import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
  components: {
    Input: {
      styles: () => ({
        label: {
          // color: '#4a90e2',
          // fontWeight: 'bold',
          // fontSize: '14px',
          // marginBottom: '8px',
        },
        input: {
          // border: '1px solid #4a90e2',
          // borderRadius: '4px',
          // padding: '10px',
          // marginBottom: rem(16),
        },
        root: {
          marginBottom: '16px',
        },
      }),
    },
    InputWrapper: {
      styles: () => ({
        label: {
          // color: 'var(--mantine-color-gray-7)',
          // fontWeight: 'bold',
          // fontSize: rem(16),
          // marginBottom: rem(4),
        },
        input: {
          // border: '1px solid red',
          // borderRadius: '4px',
          // padding: '10px',
        },
      }),
    },
  },
});
