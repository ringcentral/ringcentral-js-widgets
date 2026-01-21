/* eslint-disable @typescript-eslint/no-explicit-any */
import { sleep } from '@ringcentral-integration/utils';
import { filter } from 'ramda';
import {
  action,
  fork,
  injectable,
  optional,
  state,
  getRef,
} from 'reactant-share';
import { v4 } from 'uuid';

import { delegate, RcModule, globalStorage } from '../../lib';
import { StoragePlugin } from '../../plugins/Storage.plugin';
import { Initiator } from '../Initiator';
import { PortManager } from '../PortManager';

import type {
  PortalHostOptions,
  PortalHostResolveData,
} from './PortalHost.interface';
import { DehydratedPortal, portalKey } from './utils';

type AnyDehydratedPortal = DehydratedPortal<any, any, any>;

const resolveFn = '$$__resolveFn__$$';

@injectable({
  name: 'PortalHost',
})
export class PortalHost extends RcModule {
  private _timerCancelMap = new Map<string, () => void>();
  private _typeMap = new Map<string, AnyDehydratedPortal>();
  private _resolveFnMap = new Map<
    string,
    (result: PortalHostResolveData) => void
  >();

  @state
  private _idTypeMap: Record<string, string> = {};

  @globalStorage
  @state
  private _idTypeCacheMap: Record<string, string> = {};

  /**
   * when you need keep that in storage,
   * and do something when reopen, using `setIdTypeCacheMap` to keep it
   */
  @action
  setIdTypeCacheMap(id: string, type: string) {
    this._idTypeCacheMap[id] = type;
  }

  /**
   * if you not need any cache, set that in normal state.
   * and do something when reopen, using `setIdTypeCacheMap` instead
   */
  @action
  setIdTypeMap(id: string, type: string) {
    this._idTypeMap[id] = type;
  }

  @action
  private _removeIdTypeMaps(ids: string[]) {
    ids.forEach((id) => {
      delete this._idTypeMap[id];
      delete this._idTypeCacheMap[id];
    });
  }

  @action
  private _removeIdTypeCacheMaps(ids: string[]) {
    ids.forEach((id) => {
      delete this._idTypeCacheMap[id];
    });
  }

  @delegate('server')
  async removeIdTypeCacheMaps(ids: string[]) {
    this._removeIdTypeCacheMaps(ids);
  }

  @delegate('server')
  async clearIdTypeMaps() {
    this._clearIdTypeMaps();
  }

  @action
  private _clearIdTypeMaps() {
    this._idTypeMap = {};
    this._idTypeCacheMap = {};
  }

  constructor(
    private _portManager: PortManager,
    private _initiator: Initiator,
    private _storage: StoragePlugin,
    @optional('PortalHostOptions')
    protected _portalHostOptions?: PortalHostOptions,
  ) {
    super();
    this._storage.enable(this);
    this._initiator.beforeInit((target) => {
      this._init(target);
    });
  }

  protected _init(target: any) {
    const modalKeys = target[portalKey] as string[];
    if (!modalKeys) return;
    const { identifier } = getRef(target);
    modalKeys.forEach((key) => {
      const portalInstance = target[key] as AnyDehydratedPortal;
      const type = `${identifier}.${key}`;

      portalInstance.type = type;

      this._typeMap.set(type, portalInstance);
    });
  }

  open<T extends AnyDehydratedPortal = AnyDehydratedPortal>(
    toastInstance: T,
    payload: T['payload'],
    addItem: (id: string, type: string, payload: Record<string, any>) => void,
  ) {
    // in shared mode, payload must be serializable
    if (process.env.NODE_ENV !== 'production') {
      try {
        JSON.stringify(payload);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('[PortalHost]', { error, payload });
        throw new Error('[PortalHost] payload must be serializable');
      }
    }

    const id = v4();
    const type = toastInstance.type;
    addItem(id, type, payload as any);

    const closed = this.addResolver(id);
    return {
      id,
      closed,
    };
  }

  async close(
    items: Record<string, any>[],
    value: string | AnyDehydratedPortal,
    remove: (id: string, reason?: any) => Promise<void | boolean>,
  ) {
    const removeId = async (id: string) => {
      await this.resolveFn(id, null);
      await remove(id, 'programmatic');
    };

    if (value instanceof DehydratedPortal) {
      const type = value.type;

      const closeModals = filter((item) => {
        const model = this.getMap(item.id);
        return model?.type === type;
      }, items);

      closeModals.forEach((modal) => {
        removeId(modal.id);
      });

      return;
    }

    await removeId(value);
  }

  @delegate('server')
  async resolveFn(id: string, resolveState: PortalHostResolveData) {
    this[resolveFn](id, resolveState);
    if (this._portManager.shared) {
      // respond should be `false`.
      // After receiving the message, all tabs may be closed.
      await fork(this as any, resolveFn, [id, resolveState], {
        respond: false,
      });
    }
  }
  protected [resolveFn](id: string, resolveState: PortalHostResolveData) {
    const resolve = this._resolveFnMap.get(id);
    resolve?.(resolveState);
  }

  @delegate('server')
  async startTimer(id: string, ms: number) {
    const sleepPromise = sleep(ms);
    this._timerCancelMap.set(id, () => sleepPromise.cancel());

    try {
      await sleepPromise;
    } catch (error) {
      throw new Error('ttl be cancel');
    }
  }

  @delegate('server')
  async clearTimer(id: string) {
    const cancel = this._timerCancelMap.get(id);

    if (cancel) {
      cancel();
      this._timerCancelMap.delete(id);
    }
    this._removeIdTypeMaps([id]);
  }

  @delegate('server')
  async callOnEvent(id: string, eventName: string, ...args: any[]) {
    const modal = this.getMap(id);

    // show warning, user should confirm that warning why trigger
    if (process.env.NODE_ENV !== 'production' && !modal) {
      console.warn(
        '[PortalHost] Event emit failed, that maybe error logic in your call event, or jest async event between client and server communication,\nargs: ' +
          eventName,
        ...args,
      );
    }

    modal?.handlerRegister.get(eventName)?.(...args);
  }

  getMap(id: string) {
    const type = this._idTypeMap[id]!;
    const cacheType = this._idTypeCacheMap[id]!;

    return this._typeMap.get(type || cacheType);
  }

  /**
   * add resolve into map and group with existed resolve
   */
  addResolver(id: string) {
    const originalResolve = this._resolveFnMap.get(id);

    const closed = new Promise<PortalHostResolveData>((resolve) => {
      this._resolveFnMap.set(id, (value) => {
        originalResolve?.(value);
        resolve(value);
      });
    });

    return closed;
  }
}
