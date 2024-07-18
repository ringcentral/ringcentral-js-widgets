import clsx from 'clsx';
import React from 'react';

import styles from './styles.scss';

type SpinnerProps = {
  className?: string;
  ringWidth?: number;
};
const Spinner: React.FC<SpinnerProps> = ({ className, ringWidth }) => {
  return (
    <div className={clsx(styles.root, className)} data-sign="Spinner">
      <div className={clsx(styles.padding)} />
      <div
        className={styles.spinner}
        style={{
          borderWidth: ringWidth,
        }}
      />
    </div>
  );
};
Spinner.defaultProps = {
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  className: null,
  ringWidth: 8,
};
export default Spinner;
