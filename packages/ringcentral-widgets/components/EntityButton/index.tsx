import clsx from 'clsx';
import React from 'react';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import { Button } from '../Button';
import Spinner from '../Spinner';

import styles from './styles.scss';

type EntityButtonProps = {
  className?: string;
  onViewEntity?: (...args: any[]) => any;
  onCreateEntity?: (...args: any[]) => any;
  hasEntity?: boolean;
  isCreating?: boolean;
  disableLinks?: boolean;
  viewEntityTitle?: string;
  createEntityTitle?: string;
};
const EntityButton: React.FC<EntityButtonProps> = ({
  className,
  onViewEntity,
  onCreateEntity,
  hasEntity,
  isCreating,
  disableLinks,
  viewEntityTitle,
  createEntityTitle,
}) => {
  // console.debug('isCreating', isCreating);
  const spinner = isCreating ? (
    <div className={styles.spinnerContainer}>
      <Spinner ringWidth={2} />
    </div>
  ) : null;
  const icon = hasEntity ? dynamicsFont.record : dynamicsFont.addEntity;
  const onClick = hasEntity ? onViewEntity : onCreateEntity;
  const title = hasEntity ? viewEntityTitle : createEntityTitle;
  return (
    <Button
      className={clsx(styles.entity, className)}
      onClick={onClick}
      disabled={disableLinks}
      dataSign={title}
    >
      <span className={icon} title={title} />
      {spinner}
    </Button>
  );
};
EntityButton.defaultProps = {
  className: undefined,
  onViewEntity: undefined,
  hasEntity: false,
  onCreateEntity: undefined,
  isCreating: false,
  disableLinks: false,
  viewEntityTitle: undefined,
  createEntityTitle: undefined,
};
export default EntityButton;
