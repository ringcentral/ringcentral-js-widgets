import { RcModuleV2 } from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

const UNLOAD_EVENT_NAME = 'beforeunload';

type BeforeunloadFn = () => boolean;

@Module({
  name: 'Beforeunload',
  deps: [{ dep: 'BeforeunloadOptions', optional: true }],
})
export class Beforeunload extends RcModuleV2 {
  private get list() {
    return this._list;
  }

  private set list(value) {
    this._list = value;

    if (this._bindState && this._list.length === 0) {
      window.removeEventListener(UNLOAD_EVENT_NAME, this._beforeunloadHandler);
      // TODO: binding event here, that will not emit when close tab, not sure why
      // window.removeEventListener('unload', this._onAfterUnload);
      this._bindState = false;
    } else if (!this._bindState && this._list.length > 0) {
      window.addEventListener(UNLOAD_EVENT_NAME, this._beforeunloadHandler);
      // TODO: binding event here, that will not emit when close tab, not sure why
      // window.addEventListener('unload', this._onAfterUnload);
      this._bindState = true;
    }
  }

  private _list: BeforeunloadFn[] = [];

  private _bindState = false;

  constructor() {
    super({
      deps: {},
    });
  }

  /**
   * add method into window event beforeunload
   * @param cb a callback with boolean, if return `true` that will block browser close.
   */
  add(cb: BeforeunloadFn) {
    const index = this.list.indexOf(cb);

    if (index === -1) {
      this.list = [...this.list, cb];
      return this.list.length;
    }

    return index;
  }

  /**
   * remove check from check list.
   * @param cb a callback that you add previous.
   */
  remove(cb: BeforeunloadFn) {
    const index = this.list.indexOf(cb);

    if (index > -1) {
      this._removeItem(index);
    }

    return index;
  }

  /**
   * clear all check methods
   */
  clear() {
    this.list = [];
  }

  /**
   * check all should block callback, and return should we need block
   */
  checkShouldBlock() {
    for (const fn of this._list) {
      if (fn()) {
        return true;
      }
    }
    return false;
  }

  /**
   * that method will trigger after check not leave success
   */
  onAfterUnload(cb: () => void) {
    window.addEventListener('unload', () => {
      if (this.checkShouldBlock()) {
        cb();
      }
    });
  }

  private _removeItem(i: number) {
    const list = [...this.list];
    list.splice(i, 1);

    this.list = list;
  }

  private _beforeunloadHandler = (event: BeforeUnloadEvent) => {
    if (this.checkShouldBlock()) {
      event.preventDefault();
      event.returnValue = '';
      return;
    }

    // Guarantee the browser unload by removing the returnValue property of the event
    delete event.returnValue;
  };
}
