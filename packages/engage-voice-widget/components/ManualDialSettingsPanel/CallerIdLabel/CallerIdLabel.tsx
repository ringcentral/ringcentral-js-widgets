import React, { FunctionComponent } from 'react';

import { RcText } from '@ringcentral/juno';

import styles from './styles.scss';

export interface CallerIdLabelProps {
  number: string;
  description: string;
}

const CallerIdLabel: FunctionComponent<CallerIdLabelProps> = ({
  description,
  number,
}) => {
  return (
    <div className={styles.item}>
      <RcText
        className={styles.title}
        variant="inherit"
        component="p"
        title={description}
        titleWhenOverflow
      >
        {description}
      </RcText>
      {number !== '-1' && <p className={styles.sub}>{number}</p>}
    </div>
  );
};

export { CallerIdLabel };
