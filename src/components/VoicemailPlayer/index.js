import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import formatDuration from '../../lib/formatDuration';
import DownloadIcon from '../../assets/images/Download.svg';
import PlayIcon from '../../assets/images/Play.svg';
import PauseIcon from '../../assets/images/Pause.svg';

import Button from '../Button';

import styles from './styles.scss';

const audiosMap = {};

class VoicemailPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      paused: false,
      progress: 0,
    };

    this._id = `${props.uri && props.uri.split('?')[0].split('/').pop()}/${(new Date()).getTime()}`;
    this._audio = new Audio();
    this._audio.volume = 1;
    audiosMap[this._id] = this._audio;
    this._audio.addEventListener('timeupdate', () => {
      if (!this._mounted) {
        return;
      }
      this.setState({
        progress: (this._audio.currentTime / this._audio.duration),
      });
    });

    this._audio.addEventListener('ended', () => {
      if (!this._mounted) {
        return;
      }
      this.setState({
        playing: false,
      });
      this._audio.isPlaying = false;
    });

    this._audio.addEventListener('pause', () => {
      if (!this._mounted) {
        return;
      }
      this.setState({
        paused: true,
        playing: false,
      });
      this._audio.isPlaying = false;
    });

    this._audio.addEventListener('play', () => {
      if (!this._mounted) {
        return;
      }
      this.setState({
        playing: true,
        paused: false,
      });
      this._audio.isPlaying = true;
    });

    this._playAudio = () => {
      if (this.state.playing) {
        return;
      }
      if (!this.state.paused) {
        this._audio.src = props.uri;
        this._audio.load(props.uri);
        this._audio.currentTime = 0;
      }
      this._pauseOtherAudios();
      this._audio.play();
      if (typeof this.props.onPlay === 'function') {
        this.props.onPlay();
      }
    };

    this._pauseAudio = () => {
      if (this.state.paused) {
        return;
      }
      this._audio.pause();
    };
  }

  _pauseOtherAudios() {
    Object.keys(audiosMap).forEach((id) => {
      if (id === this._id) {
        return;
      }
      const otherAudio = audiosMap[id];
      if (otherAudio.isPlaying) {
        otherAudio.pause();
      }
    });
  }
  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
    this._audio.currentTime = 0;
    this._audio.pause();
    delete audiosMap[this._id];
  }

  render() {
    const {
      className,
      duration,
      uri,
      disabled,
    } = this.props;
    let icon;
    if (this.state.playing) {
      icon = (
        <Button
          className={classnames(styles.play, (disabled ? styles.disabled : null))}
          onClick={this._pauseAudio}
          disabled={disabled}
        >
          <PauseIcon width={18} height={18} />
        </Button>
      );
    } else {
      icon = (
        <Button
          className={classnames(styles.play, (disabled ? styles.disabled : null))}
          onClick={this._playAudio}
          disabled={disabled}
        >
          <PlayIcon width={18} height={18} />
        </Button>
      );
    }
    return (
      <div className={classnames(styles.root, className)}>
        {icon}
        <span className={styles.startTime}>{formatDuration(this._audio.currentTime)}</span>
        <a
          className={classnames(styles.download, (disabled ? styles.disabled : null))}
          target="_blank"
          download
          href={uri}
        >
          <DownloadIcon width={18} height={18} />
        </a>
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
  onPlay: PropTypes.func,
  disabled: PropTypes.bool,
};

VoicemailPlayer.defaultProps = {
  duration: 0,
  className: undefined,
  onPlay: undefined,
  disabled: false,
};

export default VoicemailPlayer;
