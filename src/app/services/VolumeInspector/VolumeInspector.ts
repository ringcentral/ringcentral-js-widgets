import {
  action,
  computed,
  delegate,
  dynamic,
  injectable,
  PortManager,
  RcModule,
  state,
} from '@ringcentral-integration/next-core';
import { getBlobURL } from '@ringcentral-integration/utils';

import { AudioSettings } from '../AudioSettings';
import type { CallAction } from '../CallAction';

import { AudioDetector } from './AudioDetector';
import { MediaRecorderHelper } from './MediaRecorderHelper';
import { MicLevelHelper } from './MicLevelHelper';
import type { AUDIO_TYPE } from './VolumeInspector.interface';
import soundBreakMp3 from './audio/break.mp3';
import {
  LEVEL_CHECK_INTERVAL,
  MAX_RECORDING_SECS,
  MAX_RECORDING_TIME,
  TEST_STATE,
  TEST_TYPE,
} from './const';
import { createAudioElement } from './utils/createAudioElement';
import { stopStream } from './utils/stream';

@injectable({
  name: 'VolumeInspector',
})
export class VolumeInspector extends RcModule {
  @dynamic('CallAction')
  protected _callAction?: CallAction;

  private mediaRecorderHelper: MediaRecorderHelper | null = null;
  private micLevel: MicLevelHelper | null = null;
  private audioDetector: AudioDetector | null = null;
  private detectorListenDisposer: (() => void) | null = null;
  private audioEl: HTMLAudioElement | null = null;
  private outputEl: HTMLAudioElement | null = null;
  private _sampleAudioBlobUrl: string = '';

  constructor(
    protected _audioSettings: AudioSettings,
    protected _portManager: PortManager,
  ) {
    super();
    if (this._portManager.shared) {
      this._portManager.onMainTab(() => this.initialize());
    } else {
      this.initialize();
    }
    this._preloadAudio();
  }

  @state testState: TEST_STATE = TEST_STATE.IDLE;
  @state countDown: number = MAX_RECORDING_SECS;
  @state volume = 0;
  @state type: AUDIO_TYPE | null = null;
  @state
  shouldRecoverCallToUnMute: boolean = false;

  @action
  private _setType(type: AUDIO_TYPE | null) {
    this.type = type;
  }

  @action
  private _setTestState(testState: TEST_STATE) {
    this.testState = testState;
  }

  @action
  private _setVolume(volume: number) {
    this.volume = volume;
  }

  @action
  private _setCountDown(countDown: number) {
    this.countDown = countDown;
  }

  @action
  private _setShouldRecoverCallToUnMute(status: boolean) {
    this.shouldRecoverCallToUnMute = status;
  }

  @delegate('server')
  async setType(type: AUDIO_TYPE | null) {
    this._setType(type);
  }

  @delegate('server')
  async setShouldRecoverCallToUnMute(status: boolean) {
    this._setShouldRecoverCallToUnMute(status);
  }

  @delegate('server')
  async setVolume(volume: number) {
    this._setVolume(volume);
  }

  @delegate('server')
  async setTestState(testState: TEST_STATE) {
    this._setTestState(testState);
    this._setVolume(0);
  }

  @delegate('server')
  async setCountDown(recordingTime: number) {
    const countDown = Math.ceil((MAX_RECORDING_TIME - recordingTime) / 1000);
    this._setCountDown(countDown);
  }

  private async _preloadAudio() {
    try {
      this._sampleAudioBlobUrl = await getBlobURL(soundBreakMp3);
    } catch (e) {
      if (process.env.NODE_ENV !== 'test')
        console.error('failed to preload audio', e);
    }
  }

  async initialize() {
    this.mediaRecorderHelper = new MediaRecorderHelper();
    this.micLevel = new MicLevelHelper();
    this.audioDetector = new AudioDetector();
    this.audioEl = createAudioElement();
    this.outputEl = createAudioElement();
    this.mediaRecorderHelper.setRecordingCompleteCallback(
      this.onRecordingComplete.bind(this),
    );
    this.mediaRecorderHelper.setUpdateRecordingTimeCallback(
      this.setCountDown.bind(this),
    );
    this.audioEl.onended = this.onEnded.bind(this);
  }

  private async setupAudioDetector() {
    if (!this.audioEl || !this.audioDetector) {
      console.warn('Can not setup AudioDetector - no audio element.');
      return;
    }
    await this.audioDetector.connect(this.audioEl);

    const result = this.audioDetector.registerListener(this.setVolumeCb);

    if (result instanceof Error) {
      console.warn('register detector listener error.');
      return;
    }
    this.detectorListenDisposer = result
      .setInterval(LEVEL_CHECK_INTERVAL)
      .start();
  }

  // only for test speaker
  public startPlaySampleAudio() {
    this.setType(TEST_TYPE.speaker);
    this.startPlayback(
      this._sampleAudioBlobUrl,
      this._audioSettings.callVolume,
    );
  }

  @delegate('mainClient')
  protected async startPlayback(src: string, volume?: number) {
    this.setTestState(TEST_STATE.PLAYS_AUDIO);
    try {
      if (this.outputEl && this.audioEl) {
        this.audioEl.src = src;
        this.audioEl.currentTime = 0;
        await this.setupAudioDetector();
        await this.audioEl.play();
        // this trick is due to connected audio analyzer (MicDetector) that makes
        // impossible to output audio to specific (selected) device other than default
        // @ts-expect-error
        this.outputEl.srcObject = this.audioEl.captureStream?.();
        if (this.outputEl.setSinkId && this._audioSettings.outputDeviceId) {
          this.outputEl.setSinkId(this._audioSettings.outputDeviceId);
        }
        if (volume !== undefined) {
          this.outputEl.volume = volume;
        }
        this.outputEl.play();
      } else {
        console.warn('Can not start playback - no audio element.');
        this.completeTest();
      }
    } catch (e) {
      console.warn('Recording play failed', e);
      this.completeTest();
    }
  }

  protected setVolumeCb = (volume: number) => {
    this.setVolume(volume);
  };

  @delegate('mainClient')
  protected async stopPlayback() {
    if (this.audioEl) {
      this.audioEl.pause();
    }
    if (this.outputEl) {
      this.outputEl.pause();
      if (this.outputEl.srcObject) {
        stopStream(this.outputEl.srcObject as MediaStream);
        this.outputEl.srcObject = null;
      }
    }
    this.detectorListenDisposer?.();
    this.detectorListenDisposer = null;
  }

  @delegate('mainClient')
  async onRecordingComplete(src: string) {
    this.micLevel!.clear();
    this.startPlayback(src);
  }

  @delegate('server')
  async setMuteBeforeAudioTest() {
    if (!this._audioSettings.enableActiveCallAudioControl) {
      return;
    }
    const { session } = this._callAction?.displayCallAllInfo || {};
    if (!session) {
      // do nothing when no active call
      return;
    }
    const isOnMute = !!session.isOnMute;
    this.setShouldRecoverCallToUnMute(!isOnMute);
    if (!isOnMute) {
      await this._callAction?.onActiveActions('mute');
    }
  }

  @delegate('server')
  async stopAudioTest() {
    if (this.testState === TEST_STATE.IDLE) {
      return;
    }
    if (this.testState === TEST_STATE.RECORDS_AUDIO) {
      this.stopRecording();
    }
    this.completeTest();
  }

  @delegate('mainClient')
  async handleTestMicroClick(testState: TEST_STATE) {
    switch (testState) {
      case TEST_STATE.IDLE:
        await this.setMuteBeforeAudioTest();
        this.startRecording();
        break;
      case TEST_STATE.RECORDS_AUDIO:
        this.stopRecording();
        break;
      case TEST_STATE.PLAYS_AUDIO:
        this.completeTest();
        break;
    }
  }

  @delegate('mainClient')
  async handleTestSpeakerClick(testState: TEST_STATE) {
    switch (testState) {
      case TEST_STATE.IDLE:
        await this.setMuteBeforeAudioTest();
        this.startPlaySampleAudio();
        break;
      case TEST_STATE.PLAYS_AUDIO:
        this.completeTest();
        break;
    }
  }

  @delegate('mainClient')
  async startRecording() {
    this.setType(TEST_TYPE.microphone);
    this.setTestState(TEST_STATE.RECORDS_AUDIO);
    let stream;
    try {
      stream = await this.micLevel!.setupMicMedia(
        this._audioSettings.inputDeviceId,
      );
    } catch (e) {
      console.warn('can not setup mic media', e);
      this.completeTest();
      return;
    }
    try {
      await this.micLevel!.listenToMic(this.setVolumeCb);
      this.mediaRecorderHelper!.startRecording(stream);
    } catch (e) {
      console.warn('can not start startRecording', e);
      this.micLevel!.clear();
      this.completeTest();
    }
  }

  @delegate('mainClient')
  async stopRecording() {
    try {
      this.mediaRecorderHelper!.stopRecording();
    } catch (e) {
      console.warn('stopRecording failed', e);
      this.completeTest();
    }
    this.micLevel!.clear();
  }

  @delegate('mainClient')
  async completeTest() {
    this.doCompleteTest();
  }

  protected onEnded() {
    this.doCompleteTest();
  }

  private async doCompleteTest() {
    this.stopPlayback();
    this.setTestState(TEST_STATE.IDLE);
    this.setType(null);
    if (
      this._audioSettings.enableActiveCallAudioControl &&
      this.shouldRecoverCallToUnMute &&
      this._callAction?.displayCallAllInfo?.session?.isOnMute
    ) {
      await this._callAction?.onActiveActions('unmute');
    }
    this.setShouldRecoverCallToUnMute(false);
  }

  @computed((that: VolumeInspector) => [
    that.volume,
    that.countDown,
    that.testState,
    that.type,
  ])
  get data() {
    return {
      volume: this.volume,
      countDown: this.countDown,
      testState: this.testState,
      isRecording: this.testState === TEST_STATE.RECORDS_AUDIO,
      type: this.type,
    };
  }
}
