import React, { FunctionComponent } from 'react';
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
      <p className={styles.title}>{description}</p>
      {number !== '-1' && <p className={styles.sub}>{number}</p>}
    </div>
  );
};

export { CallerIdLabel };
