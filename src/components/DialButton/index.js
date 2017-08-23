import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';
import audios from './audios';

const ALTERNATIVE_TIMEOUT = 1000;

export default class DialButton extends Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      pressed: false,
    };
    this.timeout = null;
    if (typeof document !== 'undefined' && document.createElement && audios[props.btn.value]) {
      this.audio = document.createElement('audio');
      this.audio.src = audios[props.btn.value];
    }
    this.onMouseDown = () => {
      if (this.audio && this.audio.canPlayType('audio/ogg') !== '') {
        this.audio.currentTime = 0;
        this.audio.play();
      }
      if (typeof this.props.onPress === 'function') {
        this.props.onPress(this.props.btn.value);
      }

      this.timeout = setTimeout(() => {
        if (this.state.pressed) {
          if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
          }
          if (typeof this.props.onOutput === 'function') {
            this.props.onOutput(this.props.btn.alternativeValue || this.props.btn.value);
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
    this.onMouseUp = () => {
      if (this.state.pressed) {
        if (this.timeout) {
          clearTimeout(this.timeout);
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
    this.onMouseLeave = () => {
      if (this.state.pressed) {
        if (this.timeout) {
          clearTimeout(this.timeout);
          this.timeout = null;
        }
        this.setState({
          pressed: false,
        });
      }
    };
  }
  render() {
    return (
      <div className={styles.btnPlaceholder}>
        <svg className={styles.btnSvg} viewBox="0 0 500 500">
          <g
            className={classnames(
              styles.btnSvgGroup,
              this.state.pressed && styles.pressed
            )}
            onMouseUp={this.onMouseUp}
            onMouseDown={this.onMouseDown}
            onMouseLeave={this.onMouseLeave}>
            <circle
              className={styles.circle}
              cx="250"
              cy="250"
              r="200"
            />
            <text
              className={styles.btnValue}
              x="0"
              dx="200"
              y="0"
              dy="280" >
              {this.props.btn.value}
            </text>
            <text
              className={styles.btnText}
              x="0"
              dx={this.props.btn.dx}
              y="0"
              dy="380">
              {this.props.btn.text}
            </text>
          </g>
        </svg>
      </div>
    );
  }
}

DialButton.propTypes = {
  btn: PropTypes.shape({
    value: PropTypes.string.isRequired,
    text: PropTypes.string,
    alternativeValue: PropTypes.string,
    dx: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func,
  onOutput: PropTypes.func,
  alternativeTimeout: PropTypes.number,
};

DialButton.defaultProps = {
  onPress: undefined,
  onOutput: undefined,
  alternativeTimeout: undefined,
};
