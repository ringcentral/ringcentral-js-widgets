import {
  action,
  computed,
  DehydratedPortal,
  delegate,
  injectable,
  optional,
  portal,
  PortalHost,
  PortalInstance,
  RcModule,
  state,
  globalStorage,
  StoragePlugin,
} from '@ringcentral-integration/next-core';
import { findIndex } from 'ramda';

import type {
  NonJSXToastItemProps,
  ToastCreatorOptions,
  ToastDehydratedPortal,
  ToastItem,
  ToastOnCloseType,
  ToastOptions,
} from './Toast.interface';

const DEFAULT_CLOSE_TIMEOUT = 5000;

/**
 * when you not need listen any change or call back, use that will be easier
 */
type SimpleToastItem = Pick<
  NonJSXToastItemProps,
  | 'message'
  | 'backdrop'
  | 'disableBackdropClick'
  | 'disableEscapeKeyDown'
  | 'action'
  | 'group'
> &
  Partial<Pick<ToastItem, 'ttl' | 'allowDuplicates'>>;

type NormalToastItem = SimpleToastItem & Pick<ToastItem, 'level'>;

const DEFAULT_DISMISS_GROUP = 'default';

@injectable({
  name: 'Toast',
})
export class Toast extends RcModule {
  @globalStorage
  @state
  private _toasts: Record<string, any>[] = [];

  @portal
  private _normalToast = this.create<NormalToastItem>({
    props: (props) => props,
  });

  private get _ttl() {
    return this._toastOptions?.ttl ?? DEFAULT_CLOSE_TIMEOUT;
  }

  constructor(
    private _storage: StoragePlugin,
    private _portalHost: PortalHost,
    @optional('ToastOptions')
    protected _toastOptions?: ToastOptions,
  ) {
    super();
    this._storage.enable(this);
  }

  protected override onInit() {
    this._dismissExpired();
  }

  /**
   * Scans the messages for expired ones and dismiss them.
   */
  private _dismissExpired() {
    const now = Date.now();
    const dismissIds = this._toasts.reduce<string[]>((acc, curr) => {
      const { ttl, timestamp, id } = curr;
      const expiredTimestamp = timestamp + ttl;

      const expired = now >= expiredTimestamp;
      if (expired) {
        acc.push(id);
        return acc;
      }

      const remainingTime = expiredTimestamp - now;

      this._waitToastClose(id, remainingTime);

      return acc;
    }, []);
    dismissIds.forEach((id) => this._removeToast(id));
    this._portalHost.removeIdTypeCacheMaps(dismissIds);
  }

  /**
   * create a toast instance for using in multiple tab.
   *
   * @param options target view and props
   * @returns toast instance
   *
   * @example
   * ```tsx
   * toast = this._toast.create({
   *  view: this._customView, // view with ToastRef implement
   *  props: () => ({
   *    disableBackdropClick: false,
   *    onClose: (e, reason) => {
   *      console.log('onClose', reason);
   *    },
   *  }),
   *});
   * ```
   * ## that must be done before or inside constructor, we must keep that instance otherwise when in multiple tab mode can't find target toast anymore.
   *
   */
  create<T extends Record<string, any> = Record<string, any>>(
    options: ToastCreatorOptions<T>,
  ) {
    const toastInstance = new DehydratedPortal<ToastCreatorOptions<T>, T>(
      options,
      {
        level: 'info',
        ttl: this._ttl,
        loading: false,
        backdrop: false,
      },
    );

    return toastInstance;
  }

  /**
   * open target toast cross multiple tabs
   *
   * ```ts
   * this._toast.open(toastInstance, {
   *    value: 'some value you want to pass once, those once pass will never be update during this toast open'
   * })
   * ```
   * @param toastInstance host toast instance
   * @param payload JSON data pass to toast, data must be `serializable`.
   */
  open<T extends ToastDehydratedPortal<any> = ToastDehydratedPortal>(
    toastInstance: T,
    payload?: T['payload'],
  ): PortalInstance {
    const instance = this._portalHost.open(toastInstance, payload, (...args) =>
      this._addToast(...args),
    );

    return {
      ...instance,
      close: () => {
        this.close(instance.id);
      },
    };
  }

  /**
   * simple success toast message,
   *
   * if you need custom jsx or style or listen callback, use open API
   */
  success(options: SimpleToastItem | string) {
    return this._openNormalToast({
      ...this._getOptions(options),
      level: 'success',
    });
  }

  /**
   * simple danger toast message,
   *
   * if you need custom jsx or style or listen callback, use open API
   */
  danger(options: SimpleToastItem | string) {
    return this._openNormalToast({
      ...this._getOptions(options),
      level: 'danger',
    });
  }

  /**
   * simple warning toast message,
   *
   * if you need custom jsx or style or listen callback, use open API
   */
  warning(options: SimpleToastItem | string) {
    return this._openNormalToast({
      ...this._getOptions(options),
      level: 'warning',
    });
  }

  /**
   * simple info toast message,
   *
   * if you need custom jsx or style or listen callback, use open API
   */
  info(options: SimpleToastItem | string) {
    return this._openNormalToast({
      ...this._getOptions(options),
      level: 'info',
    });
  }

  /**
   * simple info toast message,
   *
   * if you need custom jsx or style or listen callback, use open API
   */
  hint(options: SimpleToastItem | string) {
    return this._openNormalToast({
      ...this._getOptions(options),
      level: 'hint',
    });
  }

  private _openNormalToast(item: NormalToastItem) {
    const { allowDuplicates = true, ...options } = item;
    if (!allowDuplicates) {
      const instance = this.toasts.find(
        ({ message, level }) =>
          options.message === message && options.level === level,
      );
      if (instance) {
        const id = instance.id;
        return {
          id,
          closed: this._portalHost.addResolver(id),
          close: () => {
            this.close(id);
          },
        };
      }
    }

    this.logger.log(`${item.level} toast`, item);

    return this.open(this._normalToast, options);
  }

  /**
   * close target toast cross multiple tabs
   *
   * ```ts
   * // remove target id toast
   * this._toast.close(id)
   * // remove all target toast type toasts
   * this._toast.close(toastInstance)
   * ```
   */
  async close(value: string | DehydratedPortal<any, any, any>) {
    await this._portalHost.close(this._toasts, value, (id, reason) => {
      return this._close(id, reason);
    });
  }

  /**
   * dismiss target toast by id
   * @param idOrIds toast id or ids to dismiss
   * @param reason reason to dismiss, default is `programmatic`
   */
  @delegate('server')
  async dismiss(
    idOrIds: string | string[],
    reason: ToastOnCloseType = 'programmatic',
  ) {
    if (Array.isArray(idOrIds)) {
      // use that way to avoid do so much dispatch
      await Promise.all(
        idOrIds.map((id) => this._portalHost.resolveFn(id, null)),
      );

      this._removeIds(idOrIds);

      await Promise.all(
        idOrIds.map(async (id) => {
          await this._portalHost.callOnEvent(id, 'onClose', reason);
          await this._portalHost.clearTimer(id);
        }),
      );
      return;
    }

    await this._portalHost.resolveFn(idOrIds, null);
    this._close(idOrIds, reason);
  }

  /**
   * dismiss target toast by group
   *
   * useful when you want to dismiss all toast in a group
   *
   * @example
   * ```ts
   * this._toast.success({ message: 'message1', group: 'group1' })
   * this._toast.danger({ message: 'message1', group: 'group1' })
   * this._toast.info({ message: 'message1', group: 'group1' })
   * this._toast.info({ message: 'message2', group: 'group2' })
   *
   * this._toast.dismissByGroup('*') // all group
   * this._toast.dismissByGroup(['default']) // all default group
   * ```
   *
   * @param group group name to dismiss, default is `default`
   * @param reason reason to dismiss, default is `programmatic`
   */
  @delegate('server')
  async dismissByGroup(
    group: '*' | string[] = [DEFAULT_DISMISS_GROUP],
    reason: ToastOnCloseType = 'programmatic',
  ) {
    if (group === '*') {
      await this.dismiss(
        this.toasts.map((item) => item.id),
        reason,
      );
      return;
    }

    const ids = this.toasts
      // when not set group, will be default
      .filter((item) => group.includes(item.group ?? DEFAULT_DISMISS_GROUP))
      .map((item) => item.id);

    await this.dismiss(ids, reason);
  }

  @delegate('server')
  async dismissAllExpectSpecifiedGroup(
    group: string,
    reason: ToastOnCloseType = 'programmatic',
  ) {
    const ids = this.toasts
      .filter((item) => !item.group || item.group !== group)
      .map((item) => item.id);

    await this.dismiss(ids, reason);
  }

  @action
  private _removeIds(ids: string[]) {
    ids.forEach((id) => this._removeToast(id));
  }

  @delegate('server')
  private async _addToast(
    id: string,
    type: string,
    payload: Record<string, any>,
  ) {
    this._portalHost.setIdTypeCacheMap(id, type);

    const toastInstance = this.getMap(id)!;
    const dehydratedState = toastInstance.getDehydrateState(id, payload);

    this._innerAddToast({ ...dehydratedState, payload, timestamp: Date.now() });

    const ttl = dehydratedState.ttl;

    if (ttl > 0) {
      this._waitToastClose(id, ttl);
    }
  }

  private async _waitToastClose(id: string, ttl: any) {
    try {
      await this._portalHost.startTimer(id, ttl);
      await this.close(id);
    } catch (error) {
      // cancel be ignored
    }
  }

  @action
  private _innerAddToast(toastState: Record<string, any>) {
    this._toasts.push(toastState);
  }

  @delegate('server')
  private async _close(id: string, reason?: ToastOnCloseType) {
    this._removeToast(id);
    await this._portalHost.callOnEvent(id, 'onClose', reason);
    await this._portalHost.clearTimer(id);
  }

  @action
  private _removeToast(id: string) {
    const index = findIndex((item) => item.id === id, this._toasts);

    if (index !== -1) {
      this._toasts.splice(index, 1);
    }
  }

  private _getOptions(options: string | SimpleToastItem): SimpleToastItem {
    return typeof options === 'string'
      ? {
          message: options,
        }
      : options;
  }

  private getMap(id: string) {
    return this._portalHost.getMap(id);
  }

  @computed((that: Toast) => [that._toasts])
  get toasts(): ToastItem[] {
    return this._toasts.reduce<ToastItem[]>((acc, { id, ttl, ...rest }) => {
      const toast = this.getMap(id);

      if (toast) {
        const uiProps = {
          ...rest,
          id,
          // for hidden toast only inner, so not show in type
          toast,
          onClose: (reason: never) => {
            this.dismiss(id, reason);
          },
        };

        acc.push(uiProps as never);
      }

      return acc;
    }, []);
  }
}
