import chunk from 'lodash/chunk';
import {
  BehaviorSubject,
  buffer,
  combineLatest,
  distinctUntilChanged,
  EMPTY,
  filter,
  identity,
  map,
  type Observable,
  of,
  repeat,
  scan,
  startWith,
  Subject,
  switchMap,
  take,
  tap,
  throttleTime,
} from 'rxjs';

export type RepeatTrackingItems = readonly [string, string[]];

export type CreateRepeatTrackingManagerOptions<T extends Record<any, any>> = {
  ttl: number | 'never';
  groupKey: keyof T;
  itemKey: keyof T;
  sendToServer: (data: RepeatTrackingItems[]) => Promise<void>;
  validate?: (data: T) => boolean;
  maxBatchRequestCount?: number;
};

/**
 * Creates a manager for repeat tracking of viewable items which linking.
 *
 * When the items be linked, will interval emit to the fromServerListener api that will provide you able to know what items still on the screen
 *
 * and the linked api trigger will have a throttle time to prevent the api be triggered too often
 *
 * @template T - Generic type extending Record<string, string> representing the data structure
 *
 * @param options - Configuration options object
 * @param options.sendToServer - Function to send data to server
 * @param options.ttl - Time-to-live duration in milliseconds for cache entries
 * @param options.groupKey - Key used to group items
 * @param options.itemKey - Key used to identify individual items
 * @param options.maxBatchRequestCount - Maximum number of items per batch request (defaults to Number.MAX_SAFE_INTEGER)
 * @param options.validate - Function to validate data items
 *
 * @returns An object containing methods to manage viewable items:
 * - link: Adds a new item to be tracked
 * - unlink: Removes an item from tracking
 * - setListenerDataFromClient: Updates data for a specific client
 * - fromClientListener: Creates an observable for client-side changes
 * - fromServerListener: Creates an observable for server-side async event to fetch data and return the cache success list
 * - clear: Resets all tracking data
 *
 * @example
 * const manager = createRepeatTrackingManager({
 *   sendToServer: async (data) => { ... },
 *   ttl: 30000,
 *   groupKey: 'accountId',
 *   itemKey: 'extensionId',
 *   validate: (data) => true
 * });
 */
export const createRepeatTrackingManager = <T extends Record<any, any>>({
  sendToServer,
  ttl,
  groupKey,
  itemKey,
  maxBatchRequestCount = Number.MAX_SAFE_INTEGER,
  validate,
}: CreateRepeatTrackingManagerOptions<T>) => {
  const link$ = new Subject<T>();
  const unlink$ = new Subject<T>();
  const clientsLinkedItemsMap$ = new BehaviorSubject(
    new Map<string, RepeatTrackingItems[]>(),
  );
  const isNever = ttl === 'never';

  const cacheMap = new Map<string, number>();

  const fromClientListener = () => {
    const everLinkedMap$ = link$.pipe(
      buffer(
        // when got first value, buffer 1s data to fetch all presence in once
        link$.pipe(
          throttleTime(1000, undefined, {
            leading: false,
            trailing: true,
          }),
        ),
      ),
      // accumulate all linked presence
      scan((distinctMap, list) => {
        // distinct the list by accountId and extensionId
        list.forEach((item) => {
          const groupValue = item[groupKey];
          const itemValue = item[itemKey];

          if (validate ? validate(item) : true) {
            const set = distinctMap.get(groupValue) ?? new Set<string>();
            set.add(itemValue);
            distinctMap.set(groupValue, set);
          }
        });

        return distinctMap;
      }, new Map<string, Set<string>>()),
    );

    const unlinkBuffer$ = unlink$.pipe(
      buffer(
        unlink$.pipe(
          // 5000ms throttle for more time is fine, can later remove subscribe
          throttleTime(5000, undefined, {
            leading: false,
            trailing: true,
          }),
        ),
      ),
      startWith(null),
    );

    return combineLatest([
      everLinkedMap$,
      unlinkBuffer$.pipe(
        take(2),
        // once emit, then restart the buffer, so will only use the buffer data once, then clear
        repeat(),
      ),
    ]).pipe(
      map(([everLinkedMap, unlinkList]) => {
        if (unlinkList) {
          unlinkList.forEach((item) => {
            const groupValue = item[groupKey];
            const itemValue = item[itemKey];
            const set = everLinkedMap.get(groupValue);

            if (set) {
              set.delete(itemValue);

              if (set.size === 0) {
                everLinkedMap.delete(groupValue);
              }
            }
          });
        }

        return everLinkedMap;
      }),
      // convert to serializable list
      map((distinctMap) => {
        const list = Array.from(distinctMap).map(([groupValue, items]) => {
          const itemList = Array.from(items);

          return [groupValue, itemList] as const;
        });

        return list;
      }),
      // only emit when the list is changed
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      switchMap((data) => sendToServer(data)),
    );
  };

  const fromServerListener = (
    sendRequest: (
      data: [string, string[]][],
    ) => Promise<string[]> | Observable<string[]>,
  ) => {
    // the list from clients
    return clientsLinkedItemsMap$.pipe(
      // distinct the list by first key
      map((linkedItems) => {
        const distinctMap = new Map<string, Set<string>>();

        linkedItems.forEach((child) => {
          child.forEach((val) => {
            const [groupValue, items] = val;
            const set = distinctMap.get(groupValue) ?? new Set<string>();
            items.forEach((id) => set.add(id));
            distinctMap.set(groupValue, set);
          });
        });

        return Array.from(distinctMap.entries());
      }),
      // if the list is not empty, emit the expired presence list every ttl
      switchMap((list) => {
        return list.length > 0
          ? of(null).pipe(
              map(() =>
                list.reduce((acc, [groupValue, itemSet]) => {
                  const validExtensionIds = Array.from(itemSet).filter(
                    (item) => {
                      const prevTimestamp = cacheMap.get(item);

                      return (
                        isNever ||
                        !prevTimestamp ||
                        Date.now() - prevTimestamp >= ttl
                      );
                    },
                  );

                  if (validExtensionIds.length > 0) {
                    if (validExtensionIds.length > maxBatchRequestCount) {
                      const splitItems = chunk(
                        validExtensionIds,
                        maxBatchRequestCount,
                      );

                      splitItems.forEach((splitItem) => {
                        acc.push([groupValue, splitItem]);
                      });
                    } else {
                      acc.push([groupValue, validExtensionIds]);
                    }
                  }
                  return acc;
                }, [] as [string, string[]][]),
              ),
              filter((list) => list.length > 0),
              switchMap((data) => sendRequest(data)),
              tap((cacheList) => {
                if (isNever) return;
                // the minus 1ms to make sure the cache is expired in the next cycle
                const successTime = Date.now() - 1;

                cacheList.forEach((cacheItem) => {
                  cacheMap.set(cacheItem, successTime);
                });
              }),
              isNever ? identity : repeat({ delay: ttl }),
            )
          : EMPTY;
      }),
    );
  };

  const clear = () => {
    clientsLinkedItemsMap$.next(new Map());
    cacheMap.clear();
  };

  return {
    link(data: T) {
      link$.next(data);
    },
    unlink(data: T) {
      unlink$.next(data);
    },
    setListenerDataFromClient: (
      clientId: string,
      data: RepeatTrackingItems[],
    ) => {
      const presenceMap = clientsLinkedItemsMap$.value;
      presenceMap.set(clientId, data);
      clientsLinkedItemsMap$.next(presenceMap);
    },
    fromClientListener,
    fromServerListener,
    clear,
    get clientsLinkedItemsMap() {
      return clientsLinkedItemsMap$.value;
    },
  };
};
