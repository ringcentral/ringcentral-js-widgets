import React from 'react';

import classnames from 'classnames';

import styles from './styles.scss';

type SpinnerProps = {
  className?: string;
  ringWidth?: number;
};
const Spinner: React.SFC<SpinnerProps> = ({ className, ringWidth }) => {
  return (
    <div className={classnames(styles.root, className)} data-sign="Spinner">
      <div className={classnames(styles.padding)} />
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
