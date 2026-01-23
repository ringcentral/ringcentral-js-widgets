import { optional, state } from 'reactant-share';
import { EMPTY, isObservable, Observable, switchMap, takeUntil } from 'rxjs';

import { DEFAULT_APP_WINDOW_SIZE } from '../constant';
import { action, delegate, fromWatchValue, injectable, RcModule } from '../lib';

import { GLOBAL_DESTROY$ } from './destroy';

export type RootOptions = {
  /**
   * emit current state when expand state changed or app init
   */
  onExpand?: (state: boolean) => void | Observable<unknown>;
  /**
   * in current design, the root width is 344px, if we need have custom of that, use DI to provide the value with options
   *
   * by default will base on does set `onExpand` to use default value `w-[344px] min-w-[344px] max-w-[344px]`
   */
  expandedLayoutMainClass?: string;
};

export const DEFAULT_WIDTH = DEFAULT_APP_WINDOW_SIZE.fold.width;

@injectable({
  name: 'Root',
})
export class Root extends RcModule {
  /**
   * expand state of the whole app view container
   */
  @state
  expanded: boolean = false;

  @action
  private _setExpanded(val: boolean) {
    this.expanded = val;
  }

  @delegate('server')
  async setExpanded(val: boolean) {
    this._setExpanded(val);
  }

  destroy$ = GLOBAL_DESTROY$.asObservable();

  /**
   * get app url when init module
   */
  appUrl = `${globalThis.location.origin}${globalThis.location.pathname}`;

  expandedLayoutMainClass =
    this._rootOptions?.expandedLayoutMainClass ??
    (this._rootOptions?.onExpand !== undefined
      ? // w-[344px] min-w-[344px] max-w-[344px]
        `w-[${DEFAULT_WIDTH}px] min-w-[${DEFAULT_WIDTH}px] max-w-[${DEFAULT_WIDTH}px]`
      : undefined);

  constructor(
    @optional('RootOptions')
    private _rootOptions?: RootOptions,
  ) {
    super();

    if (process.env.THEME_SYSTEM === 'spring-ui') {
      const onExpand = this._rootOptions?.onExpand;
      if (onExpand) {
        fromWatchValue(this, () => this.expanded)
          .pipe(
            switchMap((expanded) => {
              const result = onExpand(expanded);

              if (isObservable(result)) {
                return result;
              }

              return EMPTY;
            }),
            this.takeUntilAppDestroy,
          )
          .subscribe();
      }
    }
  }

  /**
   * app destroy function, will emit destroy events
   */
  destroy() {
    GLOBAL_DESTROY$.next();
  }

  /**
   * operator that make flow be stop when app destroy.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  takeUntilAppDestroy = takeUntil<any>(this.destroy$);
}
