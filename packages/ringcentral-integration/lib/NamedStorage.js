import SymbolMap from 'data-types/symbol-map';
import uuid from 'uuid';
import Subscribable from './Subscribable';


class MemoryStorage {
  getItem() {
    return this.data;
  }
  setItem(key, data) {
    this.data = data;
  }
}

export default class NamedStorage extends Subscribable {
  constructor({
    storageKey,
  }) {
    super();
    if (!storageKey) {
      throw Error('NameLocalStorage must be created with a storage key');
    }
    this._storageKey = storageKey;
    this._id = uuid.v4();
    if (typeof localStorage !== 'undefined' && typeof window !== 'undefined') {
      this._storageHandler = (event) => {
        if (event.key === this._storageKey) {
          try {
            const {
              setter,
              data,
            } = JSON.parse(event.newValue);
            if (setter && setter !== this.id) {
              this.trigger(data);
            }
          } catch (e) {
            /* ignore error */
          }
        }
      };
      this._localStorage = localStorage;
      window.addEventListener('storage', this._storageHandler);
    } else {
      this._localStorage = new MemoryStorage();
    }
  }
  getData() {
    try {
      const {
        data,
      } = JSON.parse(this._localStorage.getItem(this._storageKey));
      return data || {};
    } catch (e) {
      /* ignore error */
      return {};
    }
  }
  setData(data) {
    this._localStorage.setItem(
      this._storageKey,
      JSON.stringify({
        setter: this.id,
        data,
      }),
    );
  }
  destroy() {
    if (this._storageHandler) {
      window.removeEventListener('storage', this._storageHandler);
    }
  }
  get id() {
    return this._id;
  }
}
