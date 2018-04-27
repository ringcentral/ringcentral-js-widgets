import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

function Message(props) {
  return (
    <div className={styles.alertHolder}>
      <div
        className={classnames(
          styles[props.level],
        )}>
        {props.message}
        <div
          className={styles.dismiss}
          onClick={props.onDismiss}>
          <i className={dynamicsFont.close} />
        </div>
      </div>
    </div>
  );
}

Message.propTypes = {
  level: PropTypes.string.isRequired,
  message: PropTypes.node.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default Message;
