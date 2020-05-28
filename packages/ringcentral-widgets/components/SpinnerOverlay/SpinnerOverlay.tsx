import classNames from 'classnames';
import React, { ComponentType, FunctionComponent } from 'react';

import Spinner from '../Spinner';
import styles from './styles.scss';

export interface SpinnerOverlayProps {
  className?: string;
  custom?: ComponentType<any>;
  classes?: {
    root?: string;
    mask?: string;
    container?: string;
  };
}
export const SpinnerOverlay: FunctionComponent<SpinnerOverlayProps> = ({
  className,
  custom: SpinnerComponent,
  classes,
}) => {
  return (
    <div
      data-sign="spinnerOverlay"
      className={classNames(styles.root, className, classes.root)}
    >
      <div className={classNames(styles.mask, classes.mask)} />
      <div className={classNames(styles.container, classes.container)}>
        <SpinnerComponent />
      </div>
    </div>
  );
};

export default SpinnerOverlay;

SpinnerOverlay.defaultProps = {
  className: undefined,
  custom: Spinner,
  classes: {},
};
