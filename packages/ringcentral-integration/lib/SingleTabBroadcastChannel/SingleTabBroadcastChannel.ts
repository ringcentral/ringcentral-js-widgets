import { waitUntilTo } from '../../utils';

type BroadcastChannelMessage = (ev: MessageEvent) => any;

export class SingleTabBroadcastChannel {
  // @ts-expect-error TS(2564): Property '_req' has no initializer and is not defi... Remove this comment to see the full error message
  private _req: BroadcastChannel;
  // @ts-expect-error TS(2564): Property '_res' has no initializer and is not defi... Remove this comment to see the full error message
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

    try {
      const result = await waitUntilTo(
        () =>
          new Promise((resolve) => {
            _resolve = resolve;

            this._res.addEventListener('message', listener);
            this._makeRequest(message);
          }),
        {
          timeout: this.checkTime,
        },
      );

      return result;
    } catch (error: any /** TODO: confirm with instanceof */) {
      return null;
    } finally {
      // @ts-expect-error TS(2454): Variable '_resolve' is used before being assigned.
      _resolve();
      this._res.removeEventListener('message', listener);
    }
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
