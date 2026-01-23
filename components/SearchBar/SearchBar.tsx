import type { RcClassesProps } from '@ringcentral/juno';
import {
  combineClasses,
  RcBox,
  RcIcon,
  RcTextField,
  styled,
} from '@ringcentral/juno';
import { Search } from '@ringcentral/juno-icon';
import clsx from 'clsx';
import React, { forwardRef, useMemo } from 'react';

import { SearchBarStyle } from './styles';
import { SearchBarClasses } from './utils';

export type SearchBarProps = {
  className?: string;
} & RcClassesProps<'root'>;

const _SearchBar = forwardRef<any, SearchBarProps>(
  ({ classes: classesProp, className, children, ...rest }, ref) => {
    const classes = useMemo(
      () => combineClasses(SearchBarClasses, classesProp),
      [classesProp],
    );
    return (
      <RcBox
        bgcolor="neutral.b02"
        ref={ref}
        className={clsx(className, classes.root)}
        {...rest}
      >
        <RcTextField
          variant="outline"
          radius="round"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <RcIcon size="small" symbol={Search} color="neutral.f02" />
            ),
          }}
          placeholder="Search..."
        />
        {children}
      </RcBox>
    );
  },
);

export const SearchBar = styled(_SearchBar)`
  ${SearchBarStyle}
`;

SearchBar.displayName = 'SearchBar';
