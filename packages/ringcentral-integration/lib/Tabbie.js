import uuid from 'uuid';
import emitter from 'event-emitter';
import sleep from './sleep';

const HEART_BEAT_INTERVAL = 1000;
// heatbeat older than HEART_BEAT_EXPIRE will be gc'ed
// chrome and firefox throttles intervals when inactive expire time of 2000
// sometimes would kill live heartbeats and cause the mainTabId to change
const HEART_BEAT_EXPIRE = 3000;
const GC_INTERVAL = 5000;

const FIGHT_TIMEOUT = 20;

/**
 * @class
 * @description The base active tab and cross tab event handling class.
 */
export default class Tabbie {
  constructor({
    prefix = '',
    heartBeatInterval = HEART_BEAT_INTERVAL,
    heartBeatExpire = HEART_BEAT_EXPIRE,
    gcInterval = GC_INTERVAL,
    fightTimeout = FIGHT_TIMEOUT,
  }) {
    this._prefix = (prefix && prefix !== '') ? `${prefix}-` : '';
    this._enabled = typeof window !== 'undefined' &&
      typeof document.visibilityState !== 'undefined' &&
      typeof localStorage !== 'undefined';
    this._id = uuid.v4();
    this._heartBeatKey = `${this.prefix}tabbie-heartBeat-${this.id}`;
    this._heartBeatRegExp = new RegExp(`^${this.prefix}tabbie-heartBeat-`);
    this._mainTabKey = `${this.prefix}tabbie-mainTab-id`;
    this._eventRegExp = new RegExp(`^${this.prefix}tabbie-event-`);
    this._heartBeatExpire = heartBeatExpire;
    this._heartBeatInterval = heartBeatInterval;
    this._gcInterval = gcInterval;
    this._fightTimeout = fightTimeout;

    if (this.enabled) {
      this._heartBeatIntervalId = setInterval(this._heartBeat, heartBeatInterval);
      this._heartBeat();

      this._gcIntervalId = setInterval(this._gc, gcInterval);

      document.addEventListener('visibilitychange', async () => {
        // avoid setting mainTabId repeatedly which may result in forced rendering
        const currentMainTabId = localStorage.getItem(this._mainTabKey);
        if (!document.hidden && currentMainTabId !== this.id) this._setAsMainTab();
      });
      window.addEventListener('storage', async (e) => {
        if (e.key === this._mainTabKey) {
          // use the newest main tab id from localhost instead of from the event
          // to avoid race conditions
          this.emit('mainTabIdChanged', await this.getMainTabId());
        } else if (
          this._heartBeatRegExp.test(e.key) &&
          (!e.newValue || e.newValue === '')
        ) {
          if (e.key.replace(this._heartBeatRegExp, '') === await this.getMainTabId()) {
            // main tab closed itself, fight to be the main tab
            // or someone gc'ed the main tab
            localStorage.removeItem(this._mainTabKey);
            await this._fightForMainTab();
          }
        } else if (
          this._eventRegExp.test(e.key) &&
          e.newValue && e.newValue !== ''
        ) {
          const payload = JSON.parse(e.newValue);
          const [id, event, ...args] = payload;
          if (id !== this.id) { // ie fires storage event on original
            this.emit('event', event, ...args);
          }
        }
      });
      window.addEventListener('unload', () => {
        clearInterval(this._gcIntervalId);
        clearInterval(this._heartBeatIntervalId);
        if (localStorage.getItem(this._mainTabKey) === this.id) {
          localStorage.removeItem(this._mainTabKey);
        }
        localStorage.removeItem(this._heartBeatKey);
      });
      if (!document.hidden) {
        this._setAsMainTab();
      } else if (!localStorage.getItem(this._mainTabKey)) {
        this._fightForMainTab();
      }
    }
  }
  _heartBeat = () => {
    localStorage.setItem(this._heartBeatKey, Date.now());
  }
  _gc = () => {
    const expiredCut = Date.now() - this._heartBeatExpire;
    this._getHeartBeatKeys().forEach(async (key) => {
      if (localStorage.getItem(key) < expiredCut) {
        localStorage.removeItem(key);
        if (key.replace(this._heartBeatRegExp, '') === await this.getMainTabId()) {
          // the tab that gc's the main tab will not receive the storage event
          this._fightForMainTab();
        }
      }
    });
  }
  _getHeartBeatKeys() {
    const { length } = localStorage;
    const keys = new Set();
    for (let i = 0; i < length; i += 1) {
      const key = localStorage.key(i);
      if (key && key !== '' && this._heartBeatRegExp.test(key)) keys.add(key);
    }
    return [...keys];
  }
  _setAsMainTab() {
    localStorage.setItem(this._mainTabKey, this.id);
    this.emit('mainTabIdChanged', this.id);
  }
  async _fightForMainTab() {
    const originalMainTabId = localStorage.getItem(this._mainTabKey);
    // if a tab becomes visible during the delay, it can just assume the main tab role
    await sleep(this._fightTimeout);
    if (localStorage.getItem(this._mainTabKey) === originalMainTabId) {
      this._setAsMainTab();
    }
  }

  /**
   * @function
   * @return {Promise} - Resolves to current main tab id
   */
  async getMainTabId() {
    const mainTabId = localStorage.getItem(this._mainTabKey);
    if (mainTabId) return mainTabId;

    return new Promise((resolve) => {
      this.once('mainTabIdChanged', resolve);
    });
  }

  async checkIsMain() {
    // assume main if not enabled
    // this is to ensure that modules depending on this would function
    // in node like environments
    return !this.enabled || (await this.getMainTabId() === this.id);
  }

  get id() {
    return this._id;
  }
  get enabled() {
    return this._enabled;
  }
  get prefix() {
    return this._prefix;
  }

  send(event, ...args) {
    if (this.enabled) {
      const id = uuid.v4();
      const key = `${this.prefix}tabbie-event-${id}`;
      const payload = [this.id, event, ...args];
      localStorage.setItem(key, JSON.stringify(payload));
      localStorage.removeItem(key);
    }
  }
}
emitter(Tabbie.prototype);
