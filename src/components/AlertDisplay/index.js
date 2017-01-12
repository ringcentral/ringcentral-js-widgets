import React, { PropTypes } from 'react';
import classnames from 'classnames';
import 'font-awesome/css/font-awesome.css';
import styles from './styles.scss';

// TODO animation

function Message(props) {
  return (
    <div className={styles.alertHolder}>
      <div
        className={classnames(
          styles[props.level],
        )}>
        { props.message }
        <div
          className={styles.dismiss}
          onClick={props.onDismiss}>
          <i className={classnames('fa', 'fa-times')} />
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
    level: PropTypes.string.isRequired,
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
