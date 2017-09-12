import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import alertLevels from 'ringcentral-integration/modules/Alert/alertLevels';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

function Message(props) {
  return (
    <div
      className={classnames(
        styles.alertHolder,
        styles[props.animation]
      )}>
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
  animation: PropTypes.func.isRequired,
};

function AlertDisplay(props) {
  return (
    <div className={classnames(styles.root, props.className)}>
      {
        props.messages.map((message) => {
          const Renderer = props.getRenderer(message);
          if (!Renderer) return null;
          return (
            <Message
              key={message.id}
              level={message.level}
              animation={message.animation}
              message={
                <Renderer
                  message={message}
                  currentLocale={props.currentLocale}
                />
              }
              onDismiss={() => {
                props.dismiss(message.id);
              }}
            />
          );
        })
      }
    </div>
  );
}
AlertDisplay.propTypes = {
  className: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    level: PropTypes.oneOf(Object.keys(alertLevels)).isRequired,
    message: PropTypes.string.isRequired,
    payload: PropTypes.any,
  })),
  getRenderer: PropTypes.func,
  dismiss: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
};
AlertDisplay.defaultProps = {
  getRenderer: () => undefined,
};

export default AlertDisplay;
