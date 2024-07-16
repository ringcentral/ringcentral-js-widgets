import clsx from 'clsx';
import React from 'react';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import { Button } from '../Button';
import Spinner from '../Spinner';

import styles from './styles.scss';

type LogButtonProps = {
  className?: string;
  onLog?: (...args: any[]) => any;
  isLogged?: boolean;
  disableLinks?: boolean;
  isLogging?: boolean;
  addTitle?: string;
  editTitle?: string;
};
const LogButton: React.FC<LogButtonProps> = ({
  className,
  onLog,
  isLogged,
  disableLinks,
  isLogging,
  addTitle,
  editTitle,
}) => {
  const spinner = isLogging ? (
    <Spinner ringWidth={2} className={styles.spinner} />
  ) : null;
  return (
    <Button
      className={clsx(styles.log, className)}
      onClick={onLog}
      disabled={disableLinks || isLogging}
    >
      <span
        className={isLogged ? dynamicsFont.edit : dynamicsFont.callLog}
        title={isLogged ? editTitle : addTitle}
      />
      {spinner}
    </Button>
  );
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
export default LogButton;
