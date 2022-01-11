import React, { FunctionComponent } from 'react';

import classNames from 'classnames';

import {
  ListItem as BaseListItem,
  ListItemProps,
} from '@ringcentral-integration/widgets/components/SelectListV2';

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
