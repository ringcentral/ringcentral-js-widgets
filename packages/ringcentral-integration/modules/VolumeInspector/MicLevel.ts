import { AudioDetector } from './AudioDetector';

/**
 * MicLevel is recommended to be a singleton when it is setupMedia for the same deviceId.
 * listenToMic() can be called repeatedly for registering different listener.
 */
export class MicLevel {
  // unit: ms
  private _interval: number = 100;

  private readonly _audioDetector: AudioDetector = new AudioDetector();

  private _preInputDeviceId?: string;
  private _audioStream?: MediaStream;
  private _detectorListenDisposer?: (() => void) | null;

  constructor() {}

  /**
   * setup microphone media by deviceId
   * if deviceId is undefined, then it will try to get user media by default
   * @param deviceId string
   * @return MediaStream or SetupMediaError when getUserMedia failed.
   */
  public async setupMicMedia(
    deviceId: string | undefined,
  ): Promise<MediaStream | Error> {
    if (!deviceId && deviceId === this._preInputDeviceId) {
      console.warn(
        `deviceId is same, not reset for setupMicMedia, deviceId:${deviceId}`,
      );
      return this._audioStream!;
    }

    const audioConstraint = {
      audio: deviceId
        ? {
            deviceId: { exact: deviceId },
          }
        : true,
    };

    let mediaStream;
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia(audioConstraint);
    } catch (err) {
      console.warn(`getUserMedia error, deviceId:${deviceId}, err:`, err);
      // to make user handle this error
      return new Error(err as string);
    }

    // make sure new mediaStream is ready then clear current mediaStream
    this.clear();

    this._audioStream = mediaStream;
    this._preInputDeviceId = deviceId || '';
    return mediaStream;
  }

  /**
   * start to listen microphone mediaStream by interval
   * @param dataCallback
   * @return disposer of listener
   */
  public async listenToMic(
    dataCallback: (volume: number) => void,
  ): Promise<any> {
    if (!this._audioStream) {
      console.warn('No audio stream to listen.');
      throw new Error('No media stream was setup.');
    }
    await this._audioDetector.connect(this._audioStream);
    // all listener will also be cleared when audioDetector disconnect.
    const result = this._audioDetector.registerListener(dataCallback);
    if (result instanceof Error) {
      console.warn('register detector listener error.');
      return result;
    }
    this._detectorListenDisposer = result.setInterval(this._interval).start();
  }

  public clear(): void {
    if (this._audioStream) {
      this._audioDetector.disconnect();
      this._audioStream.getTracks().forEach((track) => {
        track.stop();
      });
      delete this._audioStream;
      delete this._preInputDeviceId;
    }
    this._detectorListenDisposer?.();
    this._detectorListenDisposer = null;
  }

  /**
   * set interval for listener
   * @param interval number, default 100 ms
   */
  public setInterval(interval: number): MicLevel {
    this._interval = interval;
    return this;
  }
}
