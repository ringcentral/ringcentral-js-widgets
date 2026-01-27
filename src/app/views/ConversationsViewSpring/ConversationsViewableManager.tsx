import { ViewableManager } from '@ringcentral-integration/micro-core/src/app/services';
import {
  inject,
  injectable,
  PortManager,
} from '@ringcentral-integration/next-core';
import { concatAll, defer, map, Observable, of } from 'rxjs';

import type { FilteredConversation } from '../../services';

interface ConversationsViewableManagerOptions {
  onViewable: (
    groupKey: string,
    ids: string[],
  ) => Observable<void> | Promise<void>;
}

@injectable({
  name: 'ConversationsViewableManager',
})
export class ConversationsViewableManager extends ViewableManager<FilteredConversation> {
  constructor(
    protected override _portManager: PortManager,
    @inject('ConversationsViewableManagerOptions')
    private _conversationsViewableManagerOptions: ConversationsViewableManagerOptions,
  ) {
    super(_portManager, {
      viewableManagerOptions: {
        ttl: 'never',
        groupKey: 'type',
        itemKey: 'conversationId',
        maxBatchRequestCount: 10,
      },
      onViewable: (distinctMap) => {
        const obs$ = distinctMap.map(([groupKey, conversationIds]) =>
          defer(() =>
            this._conversationsViewableManagerOptions.onViewable(
              groupKey,
              conversationIds,
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
