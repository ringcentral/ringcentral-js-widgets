import { consoleIgnoreRule } from '@ringcentral-integration/core/lib/logger/loggerV2';
import { takeUntilAppDestroy } from '@ringcentral-integration/next-core';
import { fromEvent, filter, tap } from 'rxjs';

// https://sentry.io/answers/react-resizeobserver-loop-completed-with-undelivered-notifications/
// https://github.com/petyosi/react-virtuoso/issues/1039
export const uiErrorIgnorer = () => {
  fromEvent<ErrorEvent>(window, 'error', {
    capture: true,
  })
    .pipe(
      filter((event) => {
        return consoleIgnoreRule.some(
          (msg) =>
            // to ensure the error message is a string
            typeof event.message === 'string' && event.message.includes(msg),
        );
      }),
      tap((event) => event.stopImmediatePropagation()),
      takeUntilAppDestroy,
    )
    .subscribe();
};
