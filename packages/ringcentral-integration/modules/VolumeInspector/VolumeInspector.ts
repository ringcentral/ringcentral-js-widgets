import { action, RcModuleV2, state } from '@ringcentral-integration/core';
import { getBlobURL } from '@ringcentral-integration/utils';

import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';

import { AudioDetector } from './AudioDetector';
import { MediaRecorderHelper } from './MediaRecorderHelper';
import { MicLevelHelper } from './MicLevelHelper';
import type { AUDIO_TYPE, Deps } from './VolumeInspector.interface';
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

@Module({
  name: 'VolumeInspector',
  deps: ['AudioSettings'],
})
export class VolumeInspector extends RcModuleV2<Deps> {
  private readonly mediaRecorderHelper = new MediaRecorderHelper();
  private micLevel = new MicLevelHelper();
  private audioDetector = new AudioDetector();
  private detectorListenDisposer: (() => void) | null = null;
  private audioEl: HTMLAudioElement = createAudioElement();
  private outputEl: HTMLAudioElement = createAudioElement();
  private _sampleAudioBlobUrl: string = '';

  constructor(deps: Deps) {
    super({
      deps,
    });
    this._preloadAudio();
    this.mediaRecorderHelper.setRecordingCompleteCallback(
      this.onRecordingComplete.bind(this),
    );
    this.mediaRecorderHelper.setUpdateRecordingTimeCallback(
      this.setCountDown.bind(this),
    );
    this.audioEl.onended = this.onEnded.bind(this);
  }

  @state testState: TEST_STATE = TEST_STATE.IDLE;
  @state countDown: number = MAX_RECORDING_SECS;
  @state volume = 0;
  @state type: AUDIO_TYPE | null = null;

  @action
  private _setType(type: AUDIO_TYPE | null) {
    this.type = type;
  }

  @proxify
  async setType(type: AUDIO_TYPE | null) {
    this._setType(type);
  }

  @action
  private _setTestState(testState: TEST_STATE) {
    this.testState = testState;
  }

  @action
  private _setVolume(volume: number) {
    this.volume = volume;
  }

  @proxify
  async setVolume(volume: number) {
    this._setVolume(volume);
  }

  @proxify
  async setTestState(testState: TEST_STATE) {
    this._setTestState(testState);
    this._setVolume(0);
  }

  @action
  private _setCountDown(countDown: number) {
    this.countDown = countDown;
  }

  @proxify
  async setCountDown(recordingTime: number) {
    const countDown = Math.ceil((MAX_RECORDING_TIME - recordingTime) / 1000);
    this._setCountDown(countDown);
  }

  private async _preloadAudio() {
    try {
      this._sampleAudioBlobUrl = await getBlobURL(soundBreakMp3);
    } catch (e) {
      console.error('failed to preload audio', e);
    }
  }

  private async setupAudioDetector() {
    if (!this.audioEl) {
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
      this._deps.audioSettings.callVolume,
    );
  }

  protected startPlayback = async (src: string, volume?: number) => {
    this.setTestState(TEST_STATE.PLAYS_AUDIO);
    try {
      this.audioEl.src = src;
      this.audioEl.currentTime = 0;
      await this.setupAudioDetector();
      await this.audioEl.play();
      // this trick is due to connected audio analyzer (MicDetector) that makes
      // impossible to output audio to specific (selected) device other than default
      // @ts-expect-error
      this.outputEl.srcObject = this.audioEl.captureStream?.();
      if (this.outputEl.setSinkId && this._deps.audioSettings.outputDeviceId) {
        this.outputEl.setSinkId(this._deps.audioSettings.outputDeviceId);
      }
      if (volume !== undefined) {
        this.outputEl.volume = volume;
      }
      this.outputEl.play();
    } catch (e) {
      console.warn('Recording play failed', e);
      this.completeTest();
    }
  };

  protected setVolumeCb = (volume: number) => {
    this.setVolume(volume);
  };

  protected stopPlayback = () => {
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
  };

  private readonly onRecordingComplete = (src: string) => {
    this.micLevel.clear();
    this.startPlayback(src);
  };

  startRecording = async () => {
    this.setType(TEST_TYPE.microphone);
    this.setTestState(TEST_STATE.RECORDS_AUDIO);
    let stream;
    try {
      stream = await this.micLevel.setupMicMedia(
        this._deps.audioSettings.inputDeviceId,
      );
    } catch (e) {
      console.warn('can not setup mic media', e);
      this.setTestState(TEST_STATE.IDLE);
      return;
    }
    try {
      await this.micLevel.listenToMic(this.setVolumeCb);
      this.mediaRecorderHelper.startRecording(stream);
    } catch (e) {
      console.warn('can not start startRecording', e);
    }
  };

  stopRecording = () => {
    try {
      this.mediaRecorderHelper.stopRecording();
    } catch (e) {
      console.warn('stopRecording failed', e);
      this.completeTest();
    }
    this.micLevel.clear();
  };

  completeTest = () => {
    this.doCompleteTest();
  };

  protected onEnded() {
    this.doCompleteTest();
  }

  private doCompleteTest() {
    this.setType(null);
    this.setTestState(TEST_STATE.IDLE);
    this.stopPlayback();
  }
}
