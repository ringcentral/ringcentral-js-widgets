import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Spinner from '../Spinner';
import Button from '../Button';
import styles from './styles.scss';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';

export default function EntityButton({
  className,
  onViewEntity,
  onCreateEntity,
  hasEntity,
  isCreating,
  disableLinks,
  viewEntityTitle,
  createEntityTitle,
}) {
  // console.debug('isCreating', isCreating);
  const spinner = isCreating ?
    (
      <div className={styles.spinnerContainer}>
        <Spinner ringWidth={2} />
      </div>
    ) :
    null;
  const icon = hasEntity ? dynamicsFont.record : dynamicsFont.addEntity;
  const onClick = hasEntity ? onViewEntity : onCreateEntity;
  const title = hasEntity ? viewEntityTitle : createEntityTitle;
  return (
    <Button
      className={classnames(styles.entity, className)}
      onClick={onClick}
      disabled={disableLinks} >

      <span
        className={icon}
        title={title}
      />
      {spinner}
    </Button>
  );
}

EntityButton.propTypes = {
  className: PropTypes.string,
  onViewEntity: PropTypes.func,
  onCreateEntity: PropTypes.func,
  hasEntity: PropTypes.bool,
  isCreating: PropTypes.bool,
  disableLinks: PropTypes.bool,
  viewEntityTitle: PropTypes.string,
  createEntityTitle: PropTypes.string,
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
