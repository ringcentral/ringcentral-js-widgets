import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Spinner from '../Spinner';
import Button from '../Button';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

export default function LogButton({
  className,
  onLog,
  isLogged,
  disableLinks,
  isLogging,
  addTitle,
  editTitle,
}) {
  const spinner = isLogging ?
    (
      <Spinner ringWidth={2} className={styles.spinner} />
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
        }
        title={isLogged ?
          editTitle :
          addTitle
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
  viewTitle: PropTypes.string,
  editTitle: PropTypes.string,
};
LogButton.defaultProps = {
  className: undefined,
  onLog: undefined,
  isLogged: false,
  disableLinks: false,
  isLogging: false,
  addTitle: undefined,
  editTitle: undefined,
};
