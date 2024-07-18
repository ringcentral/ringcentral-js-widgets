import { RcList } from '@ringcentral/juno';
import type { FunctionComponent, ReactElement } from 'react';
import React from 'react';

import type { ListViewItemProps } from './ListViewItem';
import { ListViewItem } from './ListViewItem';

export type ListViewProps = {
  options?: ListViewItemProps['option'][];
  nonShow?: ReactElement;
  disabled?: boolean;
} & Pick<
  ListViewItemProps,
  | 'onSelect'
  | 'renderFunction'
  | 'secondaryRenderFunction'
  | 'startAdornment'
  | 'filter'
  | 'valueFunction'
  | 'onChange'
  | 'value'
  | 'multiple'
>;

export const ListView: FunctionComponent<ListViewProps> = ({
  options = [],
  nonShow,
  startAdornment,
  disabled,
  ...props
}) => {
  if (nonShow && options.length === 0) {
    return nonShow;
  }
  return (
    <RcList>
      {options.map((option, i) => (
        <ListViewItem
          key={i}
          index={i}
          option={option}
          startAdornment={startAdornment}
          disabled={disabled}
          {...props}
        />
      ))}
    </RcList>
  );
};

ListView.defaultProps = {
  options: [],
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'ReactElemen... Remove this comment to see the full error message
  nonShow: null,
};
