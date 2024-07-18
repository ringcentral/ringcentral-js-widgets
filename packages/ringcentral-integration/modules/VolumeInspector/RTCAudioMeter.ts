const LOG_TAG = 'RTCAudioMeter';
const kFftSize = 32;
const kMinDecibels = -90;
const kMaxDecibels = -30;
const kSmoothingTimeConstant = 0.0;

export class RTCAudioMeter {
  private static _audioCtx: AudioContext | null;
  private _source:
    | MediaStreamAudioSourceNode
    | MediaElementAudioSourceNode
    | undefined;
  private _analyser: AnalyserNode | undefined;
  private _data: Uint8Array | undefined;
  private static _audioMeters: RTCAudioMeter[] = [];

  private static _prepareAudioContext(): void {
    if (!RTCAudioMeter._audioCtx) {
      // @ts-expect-error
      const AudioCtxConstr = window.AudioContext || window.webkitAudioContext;
      RTCAudioMeter._audioCtx = new AudioCtxConstr();
      console.info(LOG_TAG, `prepare audio context success`);
    }
  }

  constructor() {
    this._initialize();
  }

  private _initialize(): void {
    try {
      RTCAudioMeter._prepareAudioContext();
      if (!RTCAudioMeter._audioCtx) {
        console.warn(LOG_TAG, `initialize fail because audio context is null`);
        return;
      }
      const isDuplicateAudioMeter = RTCAudioMeter._audioMeters.find(
        (item: any) => item === this,
      );
      if (!isDuplicateAudioMeter) {
        RTCAudioMeter._audioMeters.push(this);
        console.info(
          LOG_TAG,
          `Add user, length: ${RTCAudioMeter._audioMeters.length}`,
        );
      }
      this._analyser = RTCAudioMeter._audioCtx.createAnalyser();
      this._analyser.fftSize = kFftSize;
      this._analyser.minDecibels = kMinDecibels;
      this._analyser.maxDecibels = kMaxDecibels;
      this._analyser.smoothingTimeConstant = kSmoothingTimeConstant;
      this._data = new Uint8Array(this._analyser.frequencyBinCount);
      console.info(
        LOG_TAG,
        `data length is ${this._data.length} ${this._data.byteLength}`,
      );
    } catch (e) {
      console.warn(LOG_TAG, `initialize error: ${(e as Error).message}`);
    }
  }

  async updateInputStream(
    input: MediaStream | HTMLMediaElement,
  ): Promise<void> {
    console.info(LOG_TAG, `update input stream`);
    if (!RTCAudioMeter._audioCtx || !this._analyser) {
      console.info(LOG_TAG, 'There is no audioContext or audioNode');
      return Promise.reject(new Error('There is no audioContext or audioNode'));
    }
    if (this._source) {
      console.info(LOG_TAG, 'There is an old audio source, disconnect');
      this._source.disconnect();
      delete this._source;
    }
    try {
      if (RTCAudioMeter._audioCtx.state === 'suspended') {
        console.info(LOG_TAG, `Try to activate audioContext`);
        await RTCAudioMeter._audioCtx?.resume();
      }
      this._source =
        input instanceof HTMLMediaElement
          ? RTCAudioMeter._audioCtx.createMediaElementSource(input)
          : RTCAudioMeter._audioCtx.createMediaStreamSource(input);
      this._source.connect(this._analyser);
    } catch (e) {
      console.warn(
        LOG_TAG,
        `update media stream error: ${(e as Error).message}`,
      );
      return Promise.reject(e);
    }
    return Promise.resolve();
  }

  getMicLevel(): number {
    try {
      if (
        !this._source ||
        !this._analyser ||
        !this._data ||
        !RTCAudioMeter._audioCtx ||
        RTCAudioMeter._audioCtx?.state !== 'running'
      ) {
        return 0;
      }
      this._analyser.getByteFrequencyData?.(this._data);
      let audioEnergy = 0;
      for (let i = 0; i < this._data.length / 2; i++) {
        audioEnergy += this._data[i];
      }
      const audioEnergyFloat = audioEnergy / ((255 * this._data.length) / 2);
      return audioEnergyFloat;
    } catch (e) {
      console.warn(LOG_TAG, `get mic Level error: ${(e as Error).message}`);
      return 0;
    }
  }
}
