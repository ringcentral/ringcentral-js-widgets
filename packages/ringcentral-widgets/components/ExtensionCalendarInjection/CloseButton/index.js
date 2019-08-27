import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';
import iconStyles from '../commons/icons.scss';

function CloseButton({
  onClick, className
}) {
  return (
    <div className={classnames(styles.closeButton, className)} onClick={onClick}>
      <i role="presentation" className={iconStyles.msIconCancel} />
    </div>
  );
}
CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

CloseButton.defaultProps = {
  className: '',
};

export default CloseButton;
