import { RcList } from '@ringcentral/juno';
import React, { FunctionComponent, ReactElement } from 'react';

import { ListViewItem, ListViewItemProps } from './ListViewItem';

export type ListViewProps = {
  options?: ListViewItemProps['option'][];
  nonShow?: ReactElement;
} & Pick<
  ListViewItemProps,
  | 'onSelect'
  | 'renderFunction'
  | 'startAdornment'
  | 'filter'
  | 'valueFunction'
  | 'onChange'
  | 'value'
>;

export const ListView: FunctionComponent<ListViewProps> = ({
  options = [],
  nonShow,
  startAdornment,
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
          {...props}
        />
      ))}
    </RcList>
  );
};

ListView.defaultProps = {
  options: [],
  nonShow: null,
};
