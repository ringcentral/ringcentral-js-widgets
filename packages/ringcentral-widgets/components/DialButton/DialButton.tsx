import React, { Component } from 'react';

import classnames from 'classnames';

import { audios } from './audios';
import styles from './styles.scss';

const ALTERNATIVE_TIMEOUT = 1000;
// @ts-expect-error TS(2322): Type 'null' is not assignable to type 'HTMLAudioEl... Remove this comment to see the full error message
let player: HTMLAudioElement = null;

interface DialButtonProps {
  btn: {
    value: string;
    text?: string;
    alternativeValue?: string;
    dx?: string;
  };
  className?: string;
  onPress?: (...args: any[]) => any;
  onOutput?: (...args: any[]) => any;
  alternativeTimeout?: number;
  volume?: number;
  muted?: boolean;
}
interface DialButtonState {
  pressed: boolean;
}
export default class DialButton extends Component<
  DialButtonProps,
  DialButtonState
> {
  static defaultProps: Partial<DialButtonProps> = {
    volume: 1,
    muted: false,
  };

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  state: DialButtonState = {
    pressed: false,
  };

  // @ts-expect-error TS(2564): Property 'timeout' has no initializer and is not d... Remove this comment to see the full error message
  timeout: NodeJS.Timeout;

  isEdge =
    (window &&
      window.navigator &&
      window.navigator.userAgent.indexOf('Edge') > -1) ||
    false;

  // @ts-expect-error TS(2564): Property 'audio' has no initializer and is not def... Remove this comment to see the full error message
  audio: HTMLAudioElement;

  constructor(props: DialButtonProps, ...args: any[]) {
    // @ts-expect-error TS(2556): A spread argument must either have a tuple type or... Remove this comment to see the full error message
    super(props, ...args);

    if (typeof document !== 'undefined' && document.createElement && !player) {
      player = document.createElement('audio');
    }
  }

  onMouseDown = (e: any) => {
    e.preventDefault();

    if (
      player &&
      player.canPlayType('audio/ogg') !== '' &&
      audios[this.props.btn?.value]
    ) {
      // @ts-expect-error TS(2322): Type 'number | undefined' is not assignable to typ... Remove this comment to see the full error message
      player.volume = this.props.volume;
      // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
      player.muted = this.props.muted;
      player.src = audios[this.props.btn.value];
      player.currentTime = 0;
      player.play();
    }
    if (typeof this.props.onPress === 'function') {
      this.props.onPress(this.props.btn.value);
    }

    this.timeout = setTimeout(() => {
      if (this.state.pressed) {
        if (this.timeout) {
          clearTimeout(this.timeout);
          // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
          this.timeout = null;
        }
        if (typeof this.props.onOutput === 'function') {
          this.props.onOutput(
            this.props.btn.alternativeValue || this.props.btn.value,
          );
        }
        this.setState({
          pressed: false,
        });
      }
    }, this.props.alternativeTimeout || ALTERNATIVE_TIMEOUT);

    this.setState({
      pressed: true,
    });
  };

  onMouseUp = () => {
    if (this.state.pressed) {
      if (this.timeout) {
        clearTimeout(this.timeout);
        // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
        this.timeout = null;
      }
      if (typeof this.props.onOutput === 'function') {
        this.props.onOutput(this.props.btn.value);
      }
      this.setState({
        pressed: false,
      });
    }
  };

  onMouseLeave = () => {
    if (this.state.pressed) {
      if (this.timeout) {
        clearTimeout(this.timeout);
        // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
        this.timeout = null;
      }
      this.setState({
        pressed: false,
      });
    }
  };

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const isSpecial = this.props.btn.value === '*';
    return (
      <div
        data-sign={`dialPadBtn${this.props.btn.value}`}
        className={classnames(styles.root, this.props.className)}
      >
        <svg className={styles.btnSvg} viewBox="0 0 500 500">
          <g
            className={classnames(
              styles.btnSvgGroup,
              this.state.pressed && styles.pressed,
            )}
            onMouseUp={this.onMouseUp}
            onMouseDown={this.onMouseDown}
            onMouseLeave={this.onMouseLeave}
          >
            <circle className={styles.circle} cx="250" cy="250" r="191" />
            <text
              className={classnames(
                styles.btnValue,
                isSpecial ? styles.special : null,
              )}
              x="0"
              dx="205"
              y="0"
              dy={isSpecial ? 350 : 250}
            >
              {this.props.btn.value}
            </text>
            <text
              className={styles.btnText}
              x="0"
              dx={this.props.btn.dx}
              y="0"
              dy="360"
            >
              {this.props.btn.text}
            </text>
          </g>
        </svg>
      </div>
    );
  }
}
