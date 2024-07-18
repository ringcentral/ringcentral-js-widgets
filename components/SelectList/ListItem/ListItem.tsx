import type { ListItemProps } from '@ringcentral-integration/widgets/components/SelectListV2';
import { ListItem as BaseListItem } from '@ringcentral-integration/widgets/components/SelectListV2';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React from 'react';

import styles from './styles.scss';

export const ListItem: FunctionComponent<ListItemProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <BaseListItem className={clsx(styles.listItem, className)} {...rest}>
      {children}
    </BaseListItem>
  );
};
