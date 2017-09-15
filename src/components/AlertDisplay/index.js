import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import alertLevels from 'ringcentral-integration/modules/Alert/alertLevels';

import Message from '../Message';
import styles from './styles.scss';

function AlertDisplay(props) {
  const RendererMessage = props.component;
  return (
    <div className={classnames(styles.root, props.className)}>
      {
        props.messages.map((message) => {
          const Renderer = props.getRenderer(message);
          if (!Renderer) return null;
          return (
            <RendererMessage
              animation={message.animation}
              duration={message.duration}
              key={message.id}
              level={message.level}
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
  animation: PropTypes.string,
  duration: PropTypes.number,
  component: PropTypes.func,
};
AlertDisplay.defaultProps = {
  getRenderer: () => undefined,
  component: Message,
};

export default AlertDisplay;
