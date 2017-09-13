import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'animate.css/animate.min.css';
import sleep from 'ringcentral-integration/lib/sleep';
import { Message, getAlertDisplay } from '../AlertDisplay';

const DEFAULT_DURATION = 1000;
const ENTRANCE_ANIMATION = 'fadeInDown';
const EXIT_ANIMATION = 'fadeOutUp';

function AnimationMessage({ animation, duration = DEFAULT_DURATION, ...props }) {
  const second = duration / 1000;
  return (
    <div
      className={`${animation} animated`}
      style={{
        animationDuration: `${second}s`
      }}>
      <Message {...props} />
    </div>
  );
}

AnimationMessage.propTypes = {
  ...Message.propTypes,
  animation: PropTypes.string,
  duration: PropTypes.number,
};

const AlertDisplay = getAlertDisplay(AnimationMessage);

class AnimationAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages,
    };
  }
  componentWillReceiveProps(nextProps) {
    (async () => {
      const {
        duration = DEFAULT_DURATION,
        entranceAnimation = ENTRANCE_ANIMATION,
        exitAnimation = EXIT_ANIMATION,
      } = this.props;
      const currentMessagesIDs = this.props.messages.map(message => message.id);
      const nextMessagesIDs = nextProps.messages.map(message => message.id);
      const addedMessagesIDs = nextMessagesIDs.filter(id => !currentMessagesIDs.includes(id));
      const removedMessagesIDs = currentMessagesIDs.filter(id => !nextMessagesIDs.includes(id));
      const allMessagesIDs = [...new Set(currentMessagesIDs.concat(nextMessagesIDs))];
      const allMessages = this.props.messages.concat(nextProps.messages);
      const messages = allMessages
        .filter(message => allMessagesIDs.includes(message.id))
        .map((message) => {
          let animation;
          const isAddedMessage = addedMessagesIDs.includes(message.id);
          const isRemovedMessage = removedMessagesIDs.includes(message.id);
          if (isAddedMessage) {
            animation = entranceAnimation;
          } else if (isRemovedMessage) {
            animation = exitAnimation;
          }
          return {
            ...message,
            ...animation ? { animation } : {},
            duration,
          };
        });
      const stateWithAnimation = {
        messages,
      };
      this.setState(stateWithAnimation);
      await sleep(duration);
      const isCurrentEmpty = currentMessagesIDs.length === 0;
      this.setState({
        messages: isCurrentEmpty ? messages : nextProps.messages,
      });
    })();
  }
  render() {
    return (
      <AlertDisplay {...this.props} messages={this.state.messages} />
    );
  }
}

AnimationAlert.propTypes = {
  ...AlertDisplay.propTypes,
  entranceAnimation: PropTypes.string,
  exitAnimation: PropTypes.string,
  duration: PropTypes.number,
};

AnimationAlert.defaultProps = {
  ...AlertDisplay.defaultProps
};

export default AnimationAlert;
