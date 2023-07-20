import type { FunctionComponent } from 'react';
import React from 'react';

import classNames from 'classnames';

import type { ListItemProps } from '@ringcentral-integration/widgets/components/SelectListV2';
import { ListItem as BaseListItem } from '@ringcentral-integration/widgets/components/SelectListV2';

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
