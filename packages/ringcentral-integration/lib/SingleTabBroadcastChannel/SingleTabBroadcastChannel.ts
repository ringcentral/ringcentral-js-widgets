import { raceTimeout } from '../raceTimeout';

type BroadcastChannelMessage = (ev: MessageEvent) => any;

export class SingleTabBroadcastChannel {
  private _req: BroadcastChannel;
  private _res: BroadcastChannel;

  get tabId() {
    return sessionStorage.getItem(this.key) || '';
  }

  constructor(
    private key: string,
    private option: { from: string; to: string },
    private checkTime: number = 3000,
  ) {}

  onTabIdExist() {
    return new Promise<SingleTabBroadcastChannel>((resolve) => {
      const intervalId = setInterval(() => {
        if (this.tabId) {
          clearInterval(intervalId);
          this.init();
          resolve(this);
        }
      }, 300);
    });
  }

  init() {
    this._req = new BroadcastChannel(this._createKey(this.option.from));
    this._res = new BroadcastChannel(this._createKey(this.option.to));

    return this;
  }

  async request(message: { key: string; [key: string]: any }) {
    let _resolve: (value?: any) => void;

    const listener = ({ data }: MessageEvent) => {
      const { key, value } = data;
      switch (key) {
        case message.key:
          _resolve(value);
          break;
        default:
          break;
      }
    };

    const result = await raceTimeout<any>(
      new Promise((resolve) => {
        _resolve = resolve;

        this._res.addEventListener('message', listener);
        this._makeRequest(message);
      }),
      {
        timeout: this.checkTime,
        onTimeout: (resolve) => resolve(null),
        finalize: () => {
          _resolve();
          this._res.removeEventListener('message', listener);
        },
      },
    );

    return result;
  }

  send(message: any) {
    this._makeRequest(message);
  }

  addEventListener(cb: BroadcastChannelMessage) {
    this._res.onmessage = cb;
    return this;
  }

  private _makeRequest(message: any) {
    this._req.postMessage(message);
  }

  private _createKey(key: string) {
    return `${this.key}_${key}_channel$$_${this.tabId}`;
  }
}
