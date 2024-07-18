import { RcListItem } from '@ringcentral/juno';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React, { useEffect, useRef } from 'react';

import styles from './styles.scss';

export interface ListItemWithScrollCheckProps {
  scrollCheck?: any;
  onClick: () => void;
  selected?: boolean;
  className?: string;
}

export const ListItemWithScrollCheck: FunctionComponent<
  ListItemWithScrollCheckProps
> = ({ selected, onClick, children, scrollCheck, className, ...rest }) => {
  const selectElm = useRef();

  useEffect(() => {
    if (selected && scrollCheck) {
      scrollCheck(selectElm.current);
    }
  });

  return (
    <RcListItem
      {...rest}
      innerRef={selectElm}
      button
      selected={selected}
      classes={{
        root: clsx(styles.listItem, className),
      }}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </RcListItem>
  );
};
