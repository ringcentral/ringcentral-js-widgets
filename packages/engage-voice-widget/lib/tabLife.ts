import { EventEmitter } from 'events';

import { raceTimeout } from '@ringcentral-integration/commons/lib/raceTimeout';
import { sleep } from '@ringcentral-integration/commons/lib/sleep';

const TAB_CHANNEL_KEY = 'channel$$';

const ALIVE_EVENT = 'TabLife_alive';

export class TabLife {
  private _eventEmitter = new EventEmitter();
  private readonly reqKey = `${this.prefix}_req_${TAB_CHANNEL_KEY}`;
  private readonly resKey = `${this.prefix}_res_${TAB_CHANNEL_KEY}`;

  private _req: BroadcastChannel;
  private _res: BroadcastChannel;

  private _isInit = false;
  private _isAlive = false;
  private _destroy = false;

  constructor(
    private prefix: string,
    private option: { intervalTime?: number; checkTime?: number } = {
      intervalTime: 1000,
      checkTime: 30 * 1000,
    },
  ) {}

  async isAlive(timeout?: number) {
    return this._isAlive || this._checkHasAlive(timeout);
  }

  async isLeave(timeout = 3000) {
    return !(await this.isAlive(timeout));
  }

  init() {
    console.log(`${this.reqKey}--------------init`);

    if (!this._isInit) {
      this._req = new BroadcastChannel(this.reqKey);
      this._res = new BroadcastChannel(this.resKey);
    }

    this._isInit = true;
    this._isAlive = false;
    this._destroy = false;
  }

  destroy() {
    console.log(`${this.reqKey}--------------destroy`);

    if (this._isInit) {
      this._req.close();
      this._res.close();
    }

    this._isInit = false;
    this._isAlive = false;
    this._destroy = true;
  }

  alive() {
    if (!this._isAlive) {
      console.log(`${this.reqKey}--------------bindAlive`);
      this._req.onmessage = ({ data }) => {
        const { key } = data;
        console.log('alive!!!', key);
        switch (key) {
          case this.prefix:
            if (!this._destroy) {
              this._res.postMessage({ key: this.prefix });
            }
            break;

          default:
            break;
        }
      };
      this._isAlive = true;
      // for self tab get alive event
    }
    this._eventEmitter.emit(ALIVE_EVENT, true);
  }

  async onLeave(cb: () => any, checkTime = this.option.intervalTime) {
    let count = 0;

    while (count < 10) {
      if (this._isAlive || this._destroy) {
        console.log('check leave end');
        break;
      }
      const alive = await this._checkHasAlive(checkTime);
      console.log('alive?~', alive);

      if (!alive) {
        if (count > 0) {
          cb();
          break;
        }
        count++;
      } else {
        await sleep(checkTime);
      }
    }
  }

  private async _checkHasAlive(timeout = this.option.checkTime) {
    let _resolve: (value?: any) => void;

    const listener = ({ data }: MessageEvent) => {
      const { key } = data;
      switch (key) {
        case this.prefix:
          this._eventEmitter.emit(ALIVE_EVENT, true);
          break;
        default:
          break;
      }
    };

    const result = await raceTimeout<boolean>(
      new Promise((resolve) => {
        _resolve = resolve;
        this._eventEmitter.once(ALIVE_EVENT, _resolve);

        if (this._isInit) {
          try {
            this._res.addEventListener('message', listener);

            this._req.postMessage({ key: this.prefix });
          } catch (error) {
            // console.trace(error);
            resolve(false);
          }
        }
      }),
      {
        timeout,
        onTimeout: (resolve) => resolve(false),
        finalize: () => {
          this._eventEmitter.off(ALIVE_EVENT, _resolve);

          if (this._isInit) {
            try {
              this._res.removeEventListener('message', listener);
            } catch (error) {
              // console.trace(error);
            }
          }
          _resolve();
        },
      },
    );

    return result;
  }
}
