import React, { FunctionComponent, useRef, useEffect } from 'react';
import { RcListItem } from '@ringcentral-integration/rcui';
import classNames from 'classnames';
import styles from './styles.scss';

export interface ListItemWithScrollCheckProps {
  scrollCheck?: any;
  onClick: () => void;
  selected?: boolean;
  className?: string;
}

export const ListItemWithScrollCheck: FunctionComponent<ListItemWithScrollCheckProps> = ({
  selected,
  onClick,
  children,
  scrollCheck,
  className,
}) => {
  const selectElm = useRef();

  useEffect(() => {
    if (selected && scrollCheck) {
      scrollCheck(selectElm.current);
    }
  });

  return (
    <RcListItem
      innerRef={selectElm}
      button
      selected={selected}
      classes={{
        root: classNames(styles.listItem, className),
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
