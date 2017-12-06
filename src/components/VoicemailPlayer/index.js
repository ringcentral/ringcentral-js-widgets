import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import formatDuration from '../../lib/formatDuration';
import DownloadIcon from '../../assets/images/Download.svg';
import PlayIcon from '../../assets/images/Play.svg';
import PauseIcon from '../../assets/images/Pause.svg';

import styles from './styles.scss';

class VoicemailPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      paused: false,
      progress: 0,
    };

    this._audio = new Audio();
    this._audio.src = props.uri;
    this._audio.load(props.uri);
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
      if (!this.state.paused) {
        this._audio.currentTime = 0;
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
    const { className, duration } = this.props;
    let icon;
    if (this.state.playing) {
      icon = (
        <span className={styles.play} onClick={this._pauseAudio}>
          <PauseIcon width={18} height={18} />
        </span>
      );
    } else {
      icon = (
        <span className={styles.play} onClick={this._playAudio}>
          <PlayIcon width={18} height={18} />
        </span>
      );
    }
    return (
      <div className={classnames(styles.root, className)}>
        {icon}
        <span className={styles.startTime}>{formatDuration(this._audio.currentTime)}</span>
        <span className={styles.download}>
          <DownloadIcon width={18} height={18} />
        </span>
        <span className={styles.endTime}>{formatDuration(duration)}</span>
        <div className={styles.progress}>
          <div className={styles.all} />
          <div className={styles.done} style={{ width: `${this.state.progress * 100}%` }} />
          <div className={styles.current} style={{ left: `${this.state.progress * 100}%` }} />
        </div>
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
