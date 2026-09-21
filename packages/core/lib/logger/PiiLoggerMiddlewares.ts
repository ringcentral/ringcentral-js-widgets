import type { IMiddlewares } from '@ringcentral/mfe-logger';

import { UNAVAILABLE_MARKER_V2 } from './piiV2';
import { sanitizeLogParams, sanitizeLogText } from './piiSanitizer';

// Serialize each param independently so one value that JSON.stringify rejects
// cannot drop the sibling params from the log entry.
const safeStringify = (value: unknown) => {
  try {
    return JSON.stringify(value);
  } catch {
    if (Array.isArray(value)) {
      return JSON.stringify(
        value.map((item) => {
          try {
            return JSON.parse(JSON.stringify(item));
          } catch {
            return UNAVAILABLE_MARKER_V2;
          }
        }),
      );
    }

    return JSON.stringify(UNAVAILABLE_MARKER_V2);
  }
};

export class PiiLoggerMiddlewares implements IMiddlewares {
  handleContext(messageContext: Parameters<IMiddlewares['handleContext']>[0]) {
    return messageContext;
  }

  handleParams(params: unknown[] | string) {
    try {
      const sanitized =
        typeof params === 'string'
          ? sanitizeLogText(params)
          : sanitizeLogParams(params);

      return safeStringify(sanitized);
    } catch {
      return safeStringify(
        typeof params === 'string'
          ? sanitizeLogText(params)
          : [UNAVAILABLE_MARKER_V2],
      );
    }
  }
}
