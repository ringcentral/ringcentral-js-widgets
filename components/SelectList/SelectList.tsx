import React, { FunctionComponent } from 'react';
import {
  SelectListV2,
  SelectListV2Props,
} from '@ringcentral-integration/widgets/components/SelectListV2';

import styles from './styles.scss';

export type SelectListProps = SelectListV2Props;
export const SelectList: FunctionComponent<SelectListProps> = ({
  children,
  ...rest
}) => {
  return (
    <SelectListV2
      classes={{
        backHeader: styles.backHeader,
        search: {
          searchInput: styles.searchInput,
          searchResult: { noResult: styles.noResult },
          placeholder: styles.placeholder,
        },
      }}
      rightIcon={<div className={styles.fillRight} />}
      {...rest}
    >
      {children}
    </SelectListV2>
  );
};
