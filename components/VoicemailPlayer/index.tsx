import { formatDuration } from '@ringcentral-integration/commons/lib/formatDuration';
import { RcLink } from '@ringcentral/juno';
import clsx from 'clsx';
import React, { Component } from 'react';

import DownloadIcon from '../../assets/images/Download.svg';
import PauseIcon from '../../assets/images/Pause.svg';
import PlayIcon from '../../assets/images/Play.svg';
import { Button } from '../Button';

import i18n from './i18n';
import styles from './styles.scss';

const audiosMap = {};
const isFirefox = navigator.userAgent.indexOf('Firefox') > 0;

type VoicemailPlayerProps = {
  duration?: number;
  uri: string;
  className?: string;
  onPlay?: (...args: any[]) => any;
  disabled?: boolean;
  currentLocale: string;
};
type VoicemailPlayerState = {
  playing: boolean;
  paused: boolean;
  progress: number;
};
class VoicemailPlayer extends Component<
  VoicemailPlayerProps,
  VoicemailPlayerState
> {
  _audio: any;
  _id: any;
  _mounted: any;
  _pauseAudio: any;
  _playAudio: any;
  constructor(props: any) {
    super(props);
    this.state = {
      playing: false,
      paused: false,
      progress: 0,
    };
    this._id = `${
      props.uri && props.uri.split('?')[0].split('/').pop()
    }/${new Date().getTime()}`;
    this._audio = new Audio();
    this._audio.preload = false;
    this._audio.volume = 1;
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    audiosMap[this._id] = this._audio;
    this._audio.addEventListener('timeupdate', () => {
      if (!this._mounted) {
        return;
      }
      this.setState({
        progress: this._audio.currentTime / this._audio.duration,
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
  }

  _onDownloadClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    downloadUri: string,
  ) => {
    /**
     * target="_blank" doesn't work on firefox, so we need to use window.open
     */
    if (isFirefox) {
      window.open(downloadUri);
    }
  };

  _pauseOtherAudios() {
    Object.keys(audiosMap).forEach((id) => {
      if (id === this._id) {
        return;
      }
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const otherAudio = audiosMap[id];
      if (otherAudio.isPlaying && otherAudio._playPromise) {
        otherAudio._playPromise.then(() => {
          otherAudio.pause();
        });
      }
    });
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    this._mounted = true;
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentWillUnmount() {
    this._mounted = false;
    if (!Number.isNaN(this._audio.duration)) {
      this._audio.currentTime = 0;
    }
    this._audio.pause();
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    delete audiosMap[this._id];
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const { className, duration, uri, disabled, currentLocale } = this.props;
    let icon;
    if (this.state.playing) {
      icon = (
        <Button
          className={clsx(styles.play, disabled ? styles.disabled : null)}
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
          className={clsx(styles.play, disabled ? styles.disabled : null)}
          onClick={this._playAudio}
          disabled={disabled}
          dataSign="play"
        >
          <span title={i18n.getString('play', currentLocale)}>
            <PlayIcon width={18} height={18} />
          </span>
        </Button>
      );
    }
    const currentTime =
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      this._audio.currentTime < duration ? this._audio.currentTime : duration;
    const downloadUri = `${uri}&contentDisposition=Attachment`;
    return (
      <div className={clsx(styles.root, className)}>
        {icon}
        <span className={styles.startTime}>{formatDuration(currentTime)}</span>
        <RcLink
          className={clsx(styles.download, disabled ? styles.disabled : null)}
          target="_blank"
          download
          disabled={disabled}
          data-sign="download"
          title={i18n.getString('download', currentLocale)}
          href={isFirefox ? '#' : downloadUri}
          onClick={(e) => {
            this._onDownloadClick(e, downloadUri);
          }}
        >
          <DownloadIcon width={18} height={18} />
        </RcLink>
        <span className={styles.endTime}>{formatDuration(duration)}</span>
        <div className={styles.progress}>
          <div className={styles.all} />
          <div
            className={styles.done}
            style={{ width: `${this.state.progress * 100}%` }}
          />
          <div
            className={styles.current}
            style={{ left: `${this.state.progress * 100}%` }}
          />
        </div>
      </div>
    );
  }
}
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
VoicemailPlayer.defaultProps = {
  duration: 0,
  className: undefined,
  onPlay: undefined,
  disabled: false,
};
export default VoicemailPlayer;
