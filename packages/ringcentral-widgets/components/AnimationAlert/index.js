import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import 'animate.css/animate.min.css';
import sleep from 'ringcentral-integration/lib/sleep';

import Message from '../Message';
import AlertDisplay from '../AlertDisplay';

const ANIMATION_DURATION = 500;
const ENTRANCE_ANIMATION = 'fadeInDown';
const EXIT_ANIMATION = 'fadeOutUp';

function AnimationMessage({ animation, duration, ...props }) {
  const second = duration / 1000;
  return (
    <div
      className={classnames([animation, 'animated'])}
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
AnimationMessage.defaultProps = {
  animation: undefined,
  duration: ANIMATION_DURATION,
};

class AnimationAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages,
    };
  }
  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.messages === nextProps.messages) return;
    (async () => {
      const {
        duration,
        entranceAnimation,
        exitAnimation,
      } = this.props;
      const currentMessagesIDs = this.props.messages.map(message => message.id);
      const nextMessagesIDs = nextProps.messages.map(message => message.id);
      const addedMessagesIDs = nextMessagesIDs.filter(id => !currentMessagesIDs.includes(id));
      const removedMessagesIDs = currentMessagesIDs.filter(id => !nextMessagesIDs.includes(id));
      const allMessagesIDs = [...new Set(currentMessagesIDs.concat(nextMessagesIDs))];
      const allMessages = {};
      this.props.messages.concat(nextProps.messages).map((message) => {
        allMessages[message.id] = message;
        return message;
      });
      const messages = allMessagesIDs
        .map((id) => {
          const message = allMessages[id];
          const isAddedMessage = addedMessagesIDs.includes(id);
          const isRemovedMessage = removedMessagesIDs.includes(id);
          let animation;
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
      if (messages.length > 0) {
        this.setState(stateWithAnimation);
      }
      await sleep(duration);
      if (!this.mounted) return;
      const isCurrentEmpty = currentMessagesIDs.length === 0;
      this.setState({
        messages: isCurrentEmpty ? messages : nextProps.messages,
      });
    })();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      nextState.messages === this.state.messages || nextProps.messages === this.state.props
    );
  }

  render() {
    return (
      <AlertDisplay {...this.props} component={AnimationMessage} messages={this.state.messages} />
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
  ...AlertDisplay.defaultProps,
  entranceAnimation: ENTRANCE_ANIMATION,
  exitAnimation: EXIT_ANIMATION,
  duration: ANIMATION_DURATION,
};

export default AnimationAlert;
