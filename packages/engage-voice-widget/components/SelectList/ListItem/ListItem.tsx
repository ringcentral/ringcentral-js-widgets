import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import {
  ListItem as BaseListItem,
  ListItemProps,
} from 'ringcentral-widgets/components/SelectListV2';

import styles from './styles.scss';

export const ListItem: FunctionComponent<ListItemProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <BaseListItem className={classNames(styles.listItem, className)} {...rest}>
      {children}
    </BaseListItem>
  );
};
