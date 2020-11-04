import EventEmitter from 'events';
import * as uuid from 'uuid';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

const HEART_BEAT_INTERVAL = 1000;
// heartbeat older than HEART_BEAT_EXPIRE will be gc'ed
// chrome and firefox throttles intervals when inactive expire time of 2000
// sometimes would kill live heartbeats and cause the mainTabId to change
const HEART_BEAT_EXPIRE = 3000;
const GC_INTERVAL = 5000;
export const getPrefix = (prefix: string): string =>
  prefix && prefix !== '' ? `${prefix}-` : '';
export const getEventKey = (prefix: string): string => `${prefix}tabbie-event-`;

const TabbieEvents = ObjectMap.fromKeys(['mainTabIdChanged', 'event']);
/**
 * @class
 * @description The base active tab and cross tab event handling class.
 */
export class Tabbie {
  id = uuid.v4();
  enabled: boolean;
  prefix: string;

  private _emitter = new EventEmitter();

  private _mainTabKey: string;

  private _heartBeatKey: string;
  private _heartBeatRegExp: RegExp;

  private _eventKey: string;
  private _eventRegExp: RegExp;

  private _heartBeatExpire: number;
  private _heartBeatInterval: number;
  private _gcInterval: number;
  private _heartBeatIntervalId: NodeJS.Timeout;
  private _gcIntervalId: NodeJS.Timeout;

  get events() {
    return TabbieEvents;
  }

  get mainTabId() {
    return localStorage.getItem(this._mainTabKey);
  }

  get isMainTab() {
    return this.mainTabId === this.id;
  }

  get tabs() {
    return this._getHeartBeatKeys();
  }

  get actualTabIds() {
    return this.tabs.map((tab) => this._getActualId(tab));
  }

  get firstTabId() {
    const tabs = this.tabs;
    if (tabs.length) {
      return this._getActualId(tabs[0]);
    }
    return null;
  }

  get isFirstTab() {
    return this.id === this.firstTabId;
  }

  get hasMultipleTabs() {
    return (
      this.enabled &&
      this.tabs.filter(
        (key) =>
          Date.now() - Math.floor(+localStorage.getItem(key)) <
          this._heartBeatInterval * 2 - 100,
      ).length > 1
    );
  }

  constructor({
    prefix = '',
    heartBeatInterval = HEART_BEAT_INTERVAL,
    heartBeatExpire = HEART_BEAT_EXPIRE,
    gcInterval = GC_INTERVAL,
  }) {
    this.prefix = getPrefix(prefix);
    this._heartBeatInterval = heartBeatInterval;
    this._heartBeatExpire = heartBeatExpire;
    this._gcInterval = gcInterval;

    this.enabled =
      typeof window !== 'undefined' &&
      typeof document.visibilityState !== 'undefined' &&
      typeof localStorage !== 'undefined';

    const preFixHeartBeatKey = `${this.prefix}tabbie-heartBeat-`;
    this._heartBeatKey = `${preFixHeartBeatKey}${this.id}`;
    this._mainTabKey = `${this.prefix}tabbie-mainTab-id`;
    this._eventKey = getEventKey(this.prefix);

    this._heartBeatRegExp = new RegExp(`^${preFixHeartBeatKey}`);
    this._eventRegExp = new RegExp(`^${this._eventKey}`);

    if (this.enabled) {
      this._bindInterval();

      this._bindListener();
      if (!document.hidden) {
        this.setAsMainTab();
      } else if (!this.mainTabId) {
        this._setFirstTabAsMainTab();
      }
    }
  }

  private _bindInterval() {
    this._heartBeat();
    this._heartBeatIntervalId = setInterval(
      this._heartBeat,
      this._heartBeatInterval,
    );

    this._gcIntervalId = setInterval(this._gc, this._gcInterval);
  }

  private _bindListener() {
    document.addEventListener('visibilitychange', this._setAsVisibleTab);
    window.addEventListener('focus', this._setAsVisibleTab);

    window.addEventListener('storage', async ({ key, newValue }) => {
      if (key === this._mainTabKey) {
        // use the newest main tab id from localhost instead of from the event
        // to avoid race conditions
        this._emitter.emit(
          this.events.mainTabIdChanged,
          await this.getMainTabId(),
        );
      } else if (
        this._heartBeatRegExp.test(key) &&
        (!newValue || newValue === '')
      ) {
        if (this._getActualId(key) === (await this.getMainTabId())) {
          this._setFirstTabAsMainTab();
        }
      } else if (this._eventRegExp.test(key) && newValue && newValue !== '') {
        const payload = JSON.parse(newValue);
        const [id, event, ...args] = payload;
        if (id !== this.id) {
          // ie fires storage event on original
          this._emitter.emit(this.events.event, event, ...args);
        }
      }
    });

    window.addEventListener('unload', () => {
      clearInterval(this._gcIntervalId);
      clearInterval(this._heartBeatIntervalId);
      localStorage.removeItem(this._heartBeatKey);
    });
  }

  send(event: string, ...args: any[]) {
    if (!this.enabled) {
      return;
    }

    const key = `${this._eventKey}${uuid.v4()}`;

    const payload = [this.id, event, ...args];
    localStorage.setItem(key, JSON.stringify(payload));
    localStorage.removeItem(key);
  }

  /**
   * @function
   * @return {Promise} - Resolves to current main tab id
   */
  async getMainTabId(): Promise<string> {
    const mainTabId = this.mainTabId;
    if (mainTabId) return mainTabId;
    return new Promise<string>((resolve) => {
      this._emitter.once(this.events.mainTabIdChanged, resolve);
    });
  }

  /**
   * check current tab is main tab.
   */
  async checkIsMain() {
    // assume main if not enabled
    // this is to ensure that modules depending on this would function
    // in node like environments
    return !this.enabled || (await this.getMainTabId()) === this.id;
  }

  /**
   * check tab alive state by tabId
   * @param id tabId you want to check
   */
  checkTabAliveById(id: string) {
    return this.tabs.some((key) => this._getActualId(key) === id);
  }

  on(...args: Parameters<EventEmitter['on']>) {
    return this._emitter.on(...args);
  }

  private _getActualId(key: string) {
    return key.replace(this._heartBeatRegExp, '');
  }

  private _heartBeat = () => {
    localStorage.setItem(this._heartBeatKey, `${Date.now()}`);
  };

  // When there is some problem when not remove item from storage, that will remove by gc
  private _gc = async () => {
    const expiredCut = Date.now() - this._heartBeatExpire;
    let isMainTabAlive = false;
    const mainTabId = await this.getMainTabId();
    const tabs = this.tabs;

    for (let i = 0, len = tabs.length; i < len; i++) {
      const key = tabs[i];
      const isExpired = +localStorage.getItem(key) < expiredCut;
      const isMainTab = this._getActualId(key) === mainTabId;

      if (isExpired) {
        localStorage.removeItem(key);
      }

      if (isMainTab) {
        isMainTabAlive = !isExpired;
      }
    }

    // if mainTab is not alive reset mainTab to firstTab
    if (!isMainTabAlive) {
      this._setFirstTabAsMainTab();
    }
  };

  private _getHeartBeatKeys() {
    const results = new Set<string>();

    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (key && key !== '' && this._heartBeatRegExp.test(key)) {
        results.add(key);
      }
    }
    return [...results];
  }

  public setAsMainTab(id = this.id) {
    localStorage.setItem(this._mainTabKey, id);
    this._emitter.emit(this.events.mainTabIdChanged, id);
  }

  private _setAsVisibleTab = () => {
    // avoid setting mainTabId repeatedly which may result in forced rendering
    if (!document.hidden && !this.isMainTab) {
      this.setAsMainTab();
    }
  };

  private _setFirstTabAsMainTab() {
    if (this.isFirstTab) {
      localStorage.removeItem(this._mainTabKey);
      this.setAsMainTab();
    }
  }
}
