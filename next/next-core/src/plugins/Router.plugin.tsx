import { useEffect, useMemo } from 'react';
import { RouterState } from 'reactant-router';
import {
  inject,
  injectable,
  PortDetector,
  Router as BaseRouter,
  RouterOptions,
  SharedAppOptions,
  watch,
  IRouterOptions as BaseIRouterOptions,
  type ISharedAppOptions,
  getRef,
  state,
} from 'reactant-share';
import { matchPath, useRouteMatch } from 'reactant-web';

import { action, delegate } from '../lib';
import { storage } from '../lib/decorators/storage';
import { PortManager } from '../modules';

import { StoragePlugin } from './Storage.plugin';

export { RouterOptions } from 'reactant-share';

export interface IRouterOptions extends BaseIRouterOptions {
  /**
   * Enable cache for routing
   *
   * @default false
   */
  enableCache?: boolean;
}

@injectable({
  name: 'Router',
})
export class RouterPlugin extends BaseRouter {
  callbackSet = new Set<(currentPath: string) => void>();

  constructor(
    protected storage: StoragePlugin,
    protected portManager: PortManager,
    protected override portDetector: PortDetector,
    @inject(SharedAppOptions)
    protected override sharedAppOptions: ISharedAppOptions,
    @inject(RouterOptions) protected override options: IRouterOptions,
  ) {
    super(portDetector, sharedAppOptions, options);

    if (this.options.enableCache) {
      this.storage.enable(this);
    }

    watch(
      this,
      () => this.currentPath,
      (currentPath) => {
        this.callbackSet.forEach((callback) => callback(currentPath));
      },
    );

    this.portManager.onMainTab(async () => {
      // TODO: refactor portDetector about syncFullStatePromise
      await this.portDetector.syncFullStatePromise;
      if (this.portManager.isWorkerMode) {
        await this.portDetector.syncFullStatePromise;
        if (this.toBeRouted) {
          const fn = this.toBeRouted;
          this.toBeRouted = null;
          fn();
        } else {
          // if server port is ready, but client port is not ready.
          this.portDetector.transports.client
            ?.emit(
              '@@reactant:syncRouter',
              this.portDetector.name,
              this.lastRoutedTimestamp,
              this.router,
            )
            .then((routeState) => {
              if (routeState && this.compareRouter(routeState, this.router!)) {
                getRef(this).store!.dispatch(
                  this.onLocationChanged(routeState, 'REPLACE'),
                );
              }
            });
        }
      }
    });
  }

  @storage
  @state
  protected override _routers: Record<string, RouterState | undefined> = {
    [this.portDetector.name]: this.router,
  };

  /**
   * change router inner state without router change
   *
   * ## should only use that before reload page, that will make inner router state be different real browser location state
   */
  @action
  setCurrentPathWithoutLocationChange(pathname: string) {
    this._routers[this.portDetector.name]!.location.pathname = pathname;
  }

  /**
   * when you want to using params as `@computed` listener, using that to get correct result.
   *
   * > `useConnector` is a connector to Redux store, that will be calculate before component `re-render`, if your computed listener values have not redux state, must using that to get correct computed result.
   */
  useParams<T extends { [K in keyof T]?: string | undefined } = {}>(
    callback: (params: T) => void,
  ) {
    const match = useRouteMatch<T>();

    // * only callback when first render
    useMemo(() => {
      callback(match.params);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(
      () => {
        /**
         * when re-render using watch callback to get params
         */
        const listener = (currentPath: string) => {
          const result = matchPath<T>(currentPath, {
            path: match.path,
            exact: match.isExact,
            strict: true,
          });

          if (result) {
            callback(result.params);
          }
        };

        this.callbackSet.add(listener);

        return () => {
          this.callbackSet.delete(listener);
        };
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );
  }
}
