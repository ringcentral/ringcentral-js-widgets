import 'animate.css/animate.min.css';

import React, { Component } from 'react';

import { contains } from 'ramda';

import { sleep } from '@ringcentral-integration/commons/lib/sleep';

import AlertDisplay, { AlertDisplayProps } from '../AlertDisplay';
import { ANIMATION_DURATION } from './AnimationAlertUtils';
import { AnimationMessage } from './AnimationMessage';

const ENTRANCE_ANIMATION = 'fadeInDown';
const EXIT_ANIMATION = 'fadeOutUp';

type AnimationAlertProps = {
  entranceAnimation?: string;
  exitAnimation?: string;
  duration?: number;
  messages: any[];
} & AlertDisplayProps;

type AnimationAlertState = { messages: any[] };

class AnimationAlert extends Component<
  AnimationAlertProps,
  AnimationAlertState
> {
  static defaultProps: Partial<AnimationAlertProps> = {
    ...AlertDisplay.defaultProps,
    entranceAnimation: ENTRANCE_ANIMATION,
    exitAnimation: EXIT_ANIMATION,
    duration: ANIMATION_DURATION,
  };

  mounted: boolean;

  state = {
    messages: this.props.messages,
  };

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentWillReceiveProps(nextProps) {
    const { messages } = this.props;

    if (messages === nextProps.messages) return;
    (async () => {
      const { duration, entranceAnimation, exitAnimation } = this.props;
      const currentMessagesIDs = messages.map((message) => message.id);
      const nextMessagesIDs = nextProps.messages.map((message) => message.id);

      const addedMessagesIDs = nextMessagesIDs.filter(
        (id) => !contains(id, currentMessagesIDs),
      );
      const removedMessagesIDs = currentMessagesIDs.filter(
        (id) => !contains(id, nextMessagesIDs),
      );
      const allMessagesIDs = [
        ...new Set(currentMessagesIDs.concat(nextMessagesIDs)),
      ] as string[];

      const allMessages = {};

      messages.concat(nextProps.messages).map((message) => {
        allMessages[message.id] = message;
        return message;
      });

      const nextMessages = allMessagesIDs.map((id) => {
        const message = allMessages[id];
        const isAddedMessage = contains(id, addedMessagesIDs);
        const isRemovedMessage = contains(id, removedMessagesIDs);
        let animation;
        if (isAddedMessage) {
          animation = entranceAnimation;
        } else if (isRemovedMessage) {
          animation = exitAnimation;
        }
        return {
          ...message,
          ...(animation ? { animation } : {}),
          duration,
        };
      });

      if (nextMessages.length > 0) {
        this.setState({
          messages: nextMessages,
        });
      }
      await sleep(duration);

      if (!this.mounted) return;
      const isCurrentEmpty = currentMessagesIDs.length === 0;
      this.setState({
        messages: isCurrentEmpty ? nextMessages : nextProps.messages,
      });
    })();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.messages !== this.state.messages;
  }

  render() {
    return (
      <AlertDisplay
        {...this.props}
        component={AnimationMessage}
        messages={this.state.messages}
      />
    );
  }
}

export default AnimationAlert;
