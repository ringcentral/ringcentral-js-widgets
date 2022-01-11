import React, { FunctionComponent } from 'react';

import classNames from 'classnames';

import { RcListItem } from '@ringcentral/juno';

import { useScrollIntoView } from '../../react-hooks/useScrollIntoView';
import styles from './styles.scss';

export interface ListItemProps {
  onClick?(): void;
  selected?: boolean;
  className?: string;
}

/**
 * if you want to make that can be auto scroll, should add `SelectListContext` and pass scrollElmRef into.
 * example:
 * ```tsx
 *  const scrollElmRef = useRef();
 *
 *  return (
 *    <SelectListContext.Provider value={{ scrollElmRef }}>.
 *      ..
 *    </SelectListContext.Provider>
 *  );
 * ```
 */
export const ListItem: FunctionComponent<ListItemProps> = ({
  selected,
  onClick,
  children,
  className,
  // rest is need for data-sign or other data-*
  ...rest
}) => {
  const itemRef = useScrollIntoView(selected);

  return (
    <RcListItem
      innerRef={itemRef}
      button
      selected={selected}
      classes={{
        root: classNames(styles.listItem, className),
      }}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      {...rest}
    >
      {children}
    </RcListItem>
  );
};

ListItem.defaultProps = {
  selected: false,
  onClick() {},
};
