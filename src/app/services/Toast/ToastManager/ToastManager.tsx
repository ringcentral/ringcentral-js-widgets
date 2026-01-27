import {
  injectable,
  optional,
  RcModule,
} from '@ringcentral-integration/next-core';

import { Toast } from '../Toast';

import type {
  CatchErrorToastMessage,
  ToastManagerOptions,
  ToastUniqueType,
} from './ToastManager.interface';

export type ToastCatchErrorOptions = {
  /**
   * is that still throw error to outside
   */
  throwError?: boolean;
  /**
   * is that error be unique, default will be `renew`
   *
   * `keep`: if current toast be exist, not reopen another one.
   * `renew`: close current open toast, reopen new toast.
   */
  unique?: ToastUniqueType;
  /**
   * custom uniqueManager that you can use when want separate unique toast
   */
  uniqueManager?: ReturnType<
    InstanceType<typeof ToastManager>['createUniqueManager']
  >;
};

@injectable({
  name: 'ToastManager',
})
export class ToastManager extends RcModule {
  constructor(
    private _toast: Toast,
    @optional('ToastManagerOptions')
    protected _toastManagerOptions?: ToastManagerOptions,
  ) {
    super();
  }

  uniqueManager = this.createUniqueManager();

  /**
   * when you want toast be unique in all toast list, use that `uniqueManager`
   *
   * ```ts
   * uniqueManager = this.createUniqueManager();
   *
   * // when you need open toast, wrap with unique method, that can make sure this toast is unique
   * this.uniqueManager.unique(() =>
   *  this._toast.danger({ message: toastMap.server }),
   * );
   * ```
   *
   * ##### with `renew` option will close previously opened toast, then open new one
   * ```ts
   * this.uniqueManager.unique(() =>
   *  this._toast.danger({ message: toastMap.server }),
   *  'renew'
   * );
   * ```
   *
   * ##### with `keep` option, that will keep current opened toast, return previous one result.
   * ```ts
   * this.uniqueManager.unique(() =>
   *  this._toast.danger({ message: toastMap.server }),
   *  'keep'
   * );
   * ```
   */
  createUniqueManager() {
    let result: ReturnType<InstanceType<typeof Toast>['open']> | undefined =
      undefined;

    return {
      /**
       * in worker mode, this unique should always run in shared worker,
       * so that can make sure toast is unique in all toast list
       *
       * by default, this will close previously opened toast, then open new one
       *
       * if you want keep current opened toast, you can set `mode` to `keep`
       */
      unique: async (
        openFn: () => ReturnType<InstanceType<typeof Toast>['open']>,
        mode: ToastUniqueType = 'renew',
      ) => {
        if (result) {
          if (mode === 'keep') {
            return result;
          }

          await this._toast.dismiss(result.id);
        }

        result = openFn();

        result.closed.then(() => {
          result = undefined;
        });

        return result;
      },
      /**
       * dismiss all toast inside this unique manager
       */
      dismissAll: async () => {
        if (result) {
          await this._toast.dismiss(result.id);
        }
      },
    };
  }

  /**
   * Simple catch error handler with Platform API error, when err.message be `'Failed to fetch'`,
   * that will show `network error`, others will show `server error`
   */
  async catchError<T extends Promise<unknown>>(
    promise: T,
    { network, server }: CatchErrorToastMessage,
    {
      uniqueManager = this.uniqueManager,
      throwError = false,
      unique = 'renew',
    }: ToastCatchErrorOptions = {},
  ) {
    try {
      const res = await promise;
      return res;
    } catch (err) {
      if (err instanceof Error) {
        const showToast = (message: string) => {
          if (unique) {
            uniqueManager.unique(() => this._toast.danger({ message }), unique);
          } else {
            this._toast.danger({ message });
          }
        };

        if (network && err.message === 'Failed to fetch') {
          showToast(network);
        } else if (server) {
          // for current stage, rest of situation will be considered as server side error
          showToast(server);
        }
      }

      if (throwError) throw err;
    }
  }
}
