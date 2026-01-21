import { ViewableManager } from '@ringcentral-integration/micro-core/src/app/services';
import {
  inject,
  injectable,
  PortManager,
} from '@ringcentral-integration/next-core';
import { concatAll, defer, map, Observable, of } from 'rxjs';

import { HistoryCall } from '../../services';

interface CallsListItemViewableManagerOptions {
  onViewable: (
    groupKey: string,
    ids: string[],
  ) => Observable<void> | Promise<void>;
}

@injectable({
  name: 'CallsListItemViewableManager',
})
export class CallsListItemViewableManager extends ViewableManager<HistoryCall> {
  constructor(
    protected override _portManager: PortManager,
    @inject('CallsListItemViewableManagerOptions')
    private _callsListItemViewableManagerOptions: CallsListItemViewableManagerOptions,
  ) {
    super(_portManager, {
      viewableManagerOptions: {
        ttl: 'never',
        groupKey: 'type',
        itemKey: 'sessionId',
        maxBatchRequestCount: 10,
      },
      onViewable: (distinctMap) => {
        const obs$ = distinctMap.map(([groupKey, callHistoryIds]) =>
          defer(() =>
            this._callsListItemViewableManagerOptions.onViewable(
              groupKey,
              callHistoryIds,
            ),
          ),
        );

        return of(...obs$)
          .pipe(concatAll())
          .pipe(map(() => [] as string[]));
      },
    });
  }
}
