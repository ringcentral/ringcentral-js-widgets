import { DetectorListener } from './DetectorListener';
import { RTCAudioMeter } from './RTCAudioMeter';

export class AudioDetector {
  private _audioMeter = new RTCAudioMeter();
  private _listeners: Array<number> = [];
  private _audioInput?: MediaStream | HTMLMediaElement;

  /**
   * connect to audio MediaStream or HTMLMediaElement for detecting
   * @param input MediaStream | HTMLMediaElement
   */
  public async connect(input: MediaStream | HTMLMediaElement) {
    if (!input || this._audioInput === input) {
      console.warn('The same audio input has connected.');
      return;
    }
    // disconnect an old audio input if exists.
    this.disconnect();
    console.warn('Connect to the new media input.');
    try {
      await this._audioMeter.updateInputStream(input);
    } catch (e) {
      console.error('update input stream error, msg:', (e as Error).message);
      return;
    }
    this._audioInput = input;
  }

  /**
   * Add a new listener for the specified audioSource,
   * The listener will call dataCallback(volume) cyclically after it calls start().
   * The volume will be a number from [0,1].
   * @param dataCallback (volume: number) => {}
   * @return DetectorListener |
   */
  public registerListener(dataCallback: (volume: number) => void) {
    return new DetectorListener(
      this._startListenCallback,
      this._genListenerHandle(dataCallback),
      this._disposeListenCallback,
    );
  }

  /**
   * disconnect to the audioSource, and clear all listeners.
   */
  public disconnect(): void {
    if (this._listeners.length > 0) {
      this._listeners.forEach(clearInterval);
      this._listeners = [];
    }
    if (this._audioInput) {
      delete this._audioInput;
    }
  }

  // manager listener for starting listening
  private _startListenCallback = (intervalId: number) => {
    this._listeners.push(intervalId);
  };

  // generate a listener handle by dataCallback
  private _genListenerHandle(dataCallback: (volume: number) => void) {
    return () => {
      let volumeLevel: number;
      try {
        volumeLevel = this._audioMeter.getMicLevel();
      } catch (e) {
        console.warn('getVolume Error, return volume = 0, err:', e);
        volumeLevel = 0;
      }
      dataCallback(volumeLevel);
    };
  }

  // disposer listener by intervalId
  private _disposeListenCallback = (intervalId: number) => {
    const idx = this._listeners.indexOf(intervalId);
    if (idx >= 0) {
      this._listeners.splice(idx, 1);
    }
  };
}
