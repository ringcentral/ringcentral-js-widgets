import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from '../Button';

import styles from './styles.scss';

class VoicemailPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      paused: false,
      progress: 0.1,
    };

    this._audio = new Audio();
    this._audio.src = props.uri;
    this._audio.volume = 1;

    this._audio.addEventListener('timeupdate', () => {
      console.log(this._audio.duration);
      console.log(this._audio.currentTime);
      this.setState({
        progress: (this._audio.currentTime / this._audio.duration),
      });
    });

    this._audio.addEventListener('ended', () => {
      this.setState({
        playing: false,
      });
    });

    this._audio.addEventListener('pause', () => {
      this.setState({
        paused: true,
        playing: false,
      });
    });

    this._audio.addEventListener('play', () => {
      this.setState({
        playing: true,
        paused: false,
      });
    });

    this._playAudio = () => {
      if (this.state.playing) {
        return;
      }
      this._audio.play();
    };

    this._pauseAudio = () => {
      if (this.state.paused) {
        return;
      }
      this._audio.pause();
    };
  }

  render() {
    const { className } = this.props;
    return (
      <div className={classnames(styles.root, className)}>
        <Button onClick={this._playAudio}>Play</Button>
        <Button onClick={this._pauseAudio}>Pause</Button>
        {this.state.progress}
      </div>
    );
  }
}

VoicemailPlayer.propTypes = {
  duration: PropTypes.number,
  uri: PropTypes.string.isRequired,
  className: PropTypes.string,
};

VoicemailPlayer.defaultProps = {
  duration: 0,
  className: undefined,
};

export default VoicemailPlayer;
