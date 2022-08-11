import 'animate.css/animate.min.css';

import React, { Component } from 'react';

import { includes } from 'ramda';

import { sleep } from '@ringcentral-integration/commons/utils';

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

  // @ts-expect-error TS(2564): Property 'mounted' has no initializer and is not d... Remove this comment to see the full error message
  mounted: boolean;

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  state = {
    messages: this.props.messages,
  };

  override componentDidMount() {
    this.mounted = true;
  }

  override componentWillUnmount() {
    this.mounted = false;
  }

  override UNSAFE_componentWillReceiveProps(nextProps: any) {
    const { messages } = this.props;

    if (messages === nextProps.messages) return;
    (async () => {
      const { duration, entranceAnimation, exitAnimation } = this.props;
      const currentMessagesIDs = messages.map((message) => message.id);
      const nextMessagesIDs = nextProps.messages.map(
        (message: any) => message.id,
      );

      const addedMessagesIDs = nextMessagesIDs.filter(
        (id: any) => !includes(id, currentMessagesIDs),
      );
      const removedMessagesIDs = currentMessagesIDs.filter(
        (id) => !includes(id, nextMessagesIDs),
      );
      const allMessagesIDs = [
        ...new Set(currentMessagesIDs.concat(nextMessagesIDs)),
      ] as string[];

      const allMessages = {};

      messages.concat(nextProps.messages).map((message) => {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        allMessages[message.id] = message;
        return message;
      });

      const nextMessages = allMessagesIDs.map((id) => {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const message = allMessages[id];
        const isAddedMessage = includes(id, addedMessagesIDs);
        const isRemovedMessage = includes(id, removedMessagesIDs);
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

      if (typeof duration !== 'undefined') {
        await sleep(duration);
      }

      if (!this.mounted) return;
      const isCurrentEmpty = currentMessagesIDs.length === 0;
      this.setState({
        messages: isCurrentEmpty ? nextMessages : nextProps.messages,
      });
    })();
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  shouldComponentUpdate(nextProps: any, nextState: any) {
    return nextState.messages !== this.state.messages;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
