import React from 'react';
import * as I from '@tabler/icons-react';

interface IconProps extends I.IconProps {
  name: keyof typeof Icons;
  size?: string | number;
  stroke?: string | number;
  className?: string;
}

export const Icons = {
  statusInScreening: I.IconClipboardText,
  statusEnrolled: I.IconClipboardCheck,
  statusFailed: I.IconClipboardX,
  sortAsc: I.IconSortAscending,
  sortDesc: I.IconSortDescending,
  plus: I.IconPlus,
  calendar: I.IconCalendar,
  selector: I.IconSelector,
  male: I.IconGenderMale,
  female: I.IconGenderFemale,
  more: I.IconDotsVertical,
  edit: I.IconPencil,
  remove: I.IconTrash,
  search: I.IconSearch,
  x: I.IconX,
  filter: I.IconFilter,
  chevronRight: I.IconChevronRight,
};

export const Icon = ({ name, size = 21, stroke = 1.5, ...props }: IconProps) => {
  const IconComp = Icons[name];

  return (
    <IconComp
      size={size}
      stroke={stroke}
      {...props}
    />
  );
};
