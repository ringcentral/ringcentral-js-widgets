import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import formatDuration from '../../lib/formatDuration';
import DownloadIcon from '../../assets/images/Download.svg';
import PlayIcon from '../../assets/images/Play.svg';
import PauseIcon from '../../assets/images/Pause.svg';

import Button from '../Button';

import styles from './styles.scss';
import i18n from './i18n';

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
    this._audio.preload = false;
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

    this._audio.addEventListener('error', () => {
      console.error(this._audio.error);
    });

    this._playAudio = () => {
      if (this.state.playing) {
        return;
      }
      if (!this.state.paused) {
        this._audio.src = this.props.uri;
        this._audio.load(this.props.uri);
        if (!Number.isNaN(this._audio.duration)) {
          this._audio.currentTime = 0;
        }
      }
      this._pauseOtherAudios();
      this._audio._playPromise = this._audio.play();
      if (typeof this.props.onPlay === 'function') {
        this.props.onPlay();
      }
    };

    this._pauseAudio = () => {
      if (this.state.paused) {
        return;
      }
      if (this._audio._playPromise !== undefined) {
        this._audio._playPromise.then(() => {
          this._audio.pause();
        });
      }
    };

    this._onDownloadClick = (e) => {
      if (this.props.disabled) {
        e.preventDefault();
      }
    };
  }

  _pauseOtherAudios() {
    Object.keys(audiosMap).forEach((id) => {
      if (id === this._id) {
        return;
      }
      const otherAudio = audiosMap[id];
      if (otherAudio.isPlaying && otherAudio._playPromise) {
        otherAudio._playPromise.then(() => {
          otherAudio.pause();
        });
      }
    });
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
    if (!Number.isNaN(this._audio.duration)) {
      this._audio.currentTime = 0;
    }
    this._audio.pause();
    delete audiosMap[this._id];
  }

  render() {
    const {
      className,
      duration,
      uri,
      disabled,
      currentLocale,
    } = this.props;
    let icon;
    if (this.state.playing) {
      icon = (
        <Button
          className={classnames(styles.play, (disabled ? styles.disabled : null))}
          onClick={this._pauseAudio}
          disabled={disabled}
        >
          <span title={i18n.getString('pause', currentLocale)}>
            <PauseIcon width={18} height={18} />
          </span>
        </Button>
      );
    } else {
      icon = (
        <Button
          className={classnames(styles.play, (disabled ? styles.disabled : null))}
          onClick={this._playAudio}
          disabled={disabled}
        >
          <span title={i18n.getString('play', currentLocale)}>
            <PlayIcon width={18} height={18} />
          </span>
        </Button>
      );
    }
    const currentTime =
      (this._audio.currentTime < duration) ? this._audio.currentTime : duration;
    return (
      <div className={classnames(styles.root, className)}>
        {icon}
        <span className={styles.startTime}>{formatDuration(currentTime)}</span>
        <a
          className={classnames(styles.download, (disabled ? styles.disabled : null))}
          target="_blank"
          download
          title={i18n.getString('download', currentLocale)}
          href={uri}
          onClick={this._onDownloadClick}
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
  currentLocale: PropTypes.string.isRequired,
};

VoicemailPlayer.defaultProps = {
  duration: 0,
  className: undefined,
  onPlay: undefined,
  disabled: false,
};

export default VoicemailPlayer;
