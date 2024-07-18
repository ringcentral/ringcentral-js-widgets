import { AudioHelper } from 'ringcentral-web-phone/lib/audioHelper';

// @ts-expect-error
export class WebphoneAudioHelper extends AudioHelper {
  private _deviceId: string = 'default';

  override _playSound(url: string, val: boolean, volume: number) {
    // when _deviceId is empty, means app would not play audio
    if (!this.enabled || !url || this._deviceId === '') return this;
    let audio = this.audio[url];
    if (!audio) {
      if (val) {
        audio = new Audio();
        this.audio[url] = audio;
        audio.src = url;
        audio.loop = true;
        audio.volume = volume;
        if (this._deviceId && typeof audio.setSinkId === 'function') {
          audio.setSinkId(this._deviceId).catch((error: any) => {
            console.error('setSinkId error:', error);
          });
        }
        audio.playPromise = audio.play().catch((error: any) => {
          console.error('playAudio error:', error);
        });
      }
    } else {
      if (val) {
        audio.src = url; // load audio resource
        audio.currentTime = 0;
        if (
          typeof audio.setSinkId === 'function' &&
          audio.sinkId !== this._deviceId
        ) {
          audio.setSinkId(this._deviceId || '').catch((error: any) => {
            console.error('setSinkId error:', error);
          });
        }
        audio.playPromise = audio.play().catch((error: any) => {
          console.error('playAudio error:', error);
        });
      } else {
        if (audio.playPromise !== undefined) {
          audio.playPromise
            .then(function () {
              audio.pause();
            })
            .finally(() => {
              audio.src = ''; // release audio resource
            });
        }
      }
    }
    return this;
  }

  override playIncoming(val: boolean): AudioHelper {
    // @ts-ignore
    return this._playSound(this._incoming, val, this.volume ?? 0.5);
  }

  override playOutgoing(val: boolean): AudioHelper {
    // @ts-ignore
    return this._playSound(this._outgoing, val, this.volume ?? 1);
  }

  setDeviceId(val = 'default') {
    // ringtone has 'off' option
    const deviceId = val === 'off' ? '' : val;
    this._deviceId = deviceId;
    if (!this.audio || Object.keys(this.audio).length === 0) {
      return;
    }
    for (const url in this.audio) {
      const audio = this.audio[url];
      if (typeof audio.setSinkId !== 'function') {
        continue;
      }
      if (audio.playPromise !== undefined) {
        audio.playPromise.then(function () {
          audio.setSinkId(deviceId).catch((error: any) => {
            console.error('setSinkId error:', error);
          });
        });
      }
    }
  }

  get audio() {
    return (this as any)._audio;
  }

  get enabled() {
    return (this as any)._enabled;
  }
}
