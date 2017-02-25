import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';
import audios from './audios';

const keyConfig = [
  [{ value: '1', text: '' }, { value: '2', text: 'ABC', dx: '183.211' }, { value: '3', text: 'DEF', dx: '188.633' }],
  [{ value: '4', text: 'GHI', dx: '192.242' }, { value: '5', text: 'JKL', dx: '194.0235' }, { value: '6', text: 'MON', dx: '174.211' }],
  [{ value: '7', text: 'PQRS', dx: '163.3595' }, { value: '8', text: 'TUV', dx: '188.633' }, { value: '9', text: 'WXYZ', dx: '161.5705' }],
  [
    { value: '*', text: '' },
    { value: '0', text: '+', alternativeValue: '+', dx: '228.5625' },
    { value: '#', text: '' },
  ],
];

const ALTERNATIVE_TIMEOUT = 1000;

class DialButton extends Component {
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
  audio: PropTypes.string,
  onPress: PropTypes.func,
  onOutput: PropTypes.func,
  alternativeTimeout: PropTypes.number,
};

export default function DialPad(props) {
  return (
    <div className={classnames(styles.root, props.className)}>
      {keyConfig.map((row, rowIdx) => (
        <div key={rowIdx} className={styles.row}>
          {row.map(btn => {
            if (props.hideSpecial && (btn.value === '*' || btn.value === '#')) {
              return (
                <div key={btn.value} className={styles.btnPlaceholder} />
              );
            }
            return (
              <DialButton
                key={btn.value}
                btn={btn}
                onPress={props.onButtonPress}
                onOutput={props.onButtonOutput}
                alternativeTimeout={props.alternativeTimeout}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

DialPad.propTypes = {
  className: PropTypes.string,
  hideSpecial: PropTypes.bool,
  onButtonPress: PropTypes.func,
  onButtonOutput: PropTypes.func,
  alternativeTimeout: PropTypes.number,
};
