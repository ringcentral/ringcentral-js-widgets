import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Spinner from '../Spinner';
import Button from '../Button';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

export default function LogButton({
  className,
  currentLocale,
  onLog,
  isLogged,
  disableLinks,
  isLogging,
}) {
  const spinner = isLogging ?
    (
      <div className={styles.spinnerContainer}>
        <Spinner ringWidth={2} />
      </div>
    ) :
    null;
  return (
    <Button
      className={classnames(styles.log, className)}
      onClick={onLog}
      disabled={disableLinks || isLogging}
    >
      <span
        className={isLogged ?
          dynamicsFont.edit :
          dynamicsFont.callLog
        } />
      {spinner}
    </Button>
  );
}
LogButton.propTypes = {
  className: PropTypes.string,
  onLog: PropTypes.func,
  isLogged: PropTypes.bool,
  disableLinks: PropTypes.bool,
  isLogging: PropTypes.bool,
  currentLocale: PropTypes.string.isRequired,
};
LogButton.defaultProps = {
  className: undefined,
  onLog: undefined,
  isLogged: false,
  disableLinks: false,
  isLogging: false,
};
