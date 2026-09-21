import {
  OVER_DEPTH_VALUE,
  SECRET_MARKER_V2,
} from '@ringcentral-integration/next-core';
import type { Event } from '@sentry/types';

import { sanitizeSentryEvent } from './sanitizeSentryEvent';

interface NestedTrace {
  level1: {
    level2: {
      level3: {
        level4: {
          level5: {
            level6: {
              trace: string;
            };
          };
        };
      };
    };
  };
}

describe('sanitizeSentryEvent', () => {
  it('masks Sentry user, tags, request, and message PII', () => {
    const event: Event = {
      message:
        'Failed callback fromName=Michael Lin token=secret for michael@example.com +16505551234',
      user: {
        id: '12345',
        email: 'michael@example.com',
        username: 'Michael Lin',
      },
      tags: {
        accountId: '98765',
        release: '1.2.3',
      },
      request: {
        url: '/callback?code=abc&token=secret',
        headers: {
          Authorization: 'Bearer token-value',
          Cookie: 'sid=raw-cookie-header; rc=raw-cookie-other',
          'Set-Cookie': 'sid=raw-set-cookie; Path=/',
        },
        cookies: {
          sid: 'raw-cookie-map',
        },
      },
    };

    const sanitized = sanitizeSentryEvent(event);

    expect(sanitized.message).toContain('Failed callback');
    expect(sanitized.message).not.toContain('Michael Lin');
    expect(sanitized.message).not.toContain('michael@example.com');
    expect(sanitized.message).not.toContain('+16505551234');
    expect(sanitized.message).not.toMatch(/\[PII:v2;/);
    expect(sanitized.user?.id).toBe(SECRET_MARKER_V2);
    expect(sanitized.user?.email).toBe(SECRET_MARKER_V2);
    expect(sanitized.user?.username).toBe(SECRET_MARKER_V2);
    expect(sanitized.tags?.accountId).toBe(SECRET_MARKER_V2);
    expect(sanitized.tags?.release).toBe('1.2.3');
    expect(sanitized.request?.url).toContain('code=[Secret:v2]');
    expect(sanitized.request?.url).toContain('token=[Secret:v2]');
    expect(sanitized.request?.headers?.Authorization).not.toContain(
      'token-value',
    );
    expect(sanitized.request?.headers?.Authorization).not.toMatch(/\[PII:v2;/);
    expect(sanitized.request?.headers?.Cookie).toBe(SECRET_MARKER_V2);
    expect(sanitized.request?.headers?.['Set-Cookie']).toBe(SECRET_MARKER_V2);
    expect(sanitized.request?.cookies?.sid).toBe(SECRET_MARKER_V2);
  });

  it('sanitizes structured logentry params without throwing', () => {
    const event: Event = {
      logentry: {
        message: 'Failed callback token=secret',
        params: [
          {
            Authorization: 'Bearer token-value',
            contact: {
              phoneNumber: '+16505551234',
            },
          },
          500,
          true,
          null,
          'callback token=secret for michael@example.com',
        ] as unknown as string[],
      },
    };

    expect(() => sanitizeSentryEvent(event)).not.toThrow();

    const sanitized = sanitizeSentryEvent(event);
    const params = sanitized.logentry?.params as unknown[];
    const structuredParam = params[0] as {
      Authorization: string;
      contact: {
        phoneNumber: string;
      };
    };

    expect(sanitized.logentry?.message).not.toContain('secret');
    expect(structuredParam.Authorization).not.toContain('token-value');
    expect(structuredParam.contact.phoneNumber).toBe(SECRET_MARKER_V2);
    expect(params[1]).toBe(500);
    expect(params[2]).toBe(true);
    expect(params[3]).toBeNull();
    expect(params[4]).not.toContain('secret');
    expect(params[4]).not.toContain('michael@example.com');
    expect(params[4]).not.toMatch(/\[PII:v2;/);
  });

  it('preserves exception stack frames while sanitizing exception text and frame vars', () => {
    const event: Event = {
      exception: {
        values: [
          {
            type: 'AuthError',
            value:
              'Failed auth token=secret for michael@example.com +16505551234',
            stacktrace: {
              frames: [
                {
                  filename: 'apps/micro-auth/src/app/services/Auth/Auth.ts',
                  function: 'init',
                  lineno: 400,
                  colno: 12,
                  context_line:
                    'throw new Error("token=secret phoneNumber=+16505551234")',
                  vars: {
                    phoneNumber: '+16505551234',
                    token: 'secret-token',
                    nested: {
                      level1: {
                        level2: {
                          level3: {
                            level4: {
                              level5: {
                                level6: {
                                  trace: 'preserved',
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    };

    const sanitized = sanitizeSentryEvent(event);
    const exception = sanitized.exception?.values?.[0];
    const frame = exception?.stacktrace?.frames?.[0];

    expect(exception?.value).toContain('Failed auth');
    expect(exception?.value).not.toContain('secret');
    expect(exception?.value).not.toContain('michael@example.com');
    expect(exception?.value).not.toContain('+16505551234');
    expect(exception?.value).not.toMatch(/\[PII:v2;/);
    expect(frame).toMatchObject({
      filename: 'apps/micro-auth/src/app/services/Auth/Auth.ts',
      function: 'init',
      lineno: 400,
      colno: 12,
    });
    expect(frame?.context_line).not.toContain('secret');
    expect(frame?.context_line).not.toContain('+16505551234');
    expect(frame?.vars?.phoneNumber).toBe(SECRET_MARKER_V2);
    expect(JSON.stringify(frame)).not.toContain(OVER_DEPTH_VALUE);
    expect(JSON.stringify(frame)).not.toMatch(/\[PII:v2;/);
  });

  it('preserves breadcrumb and context structure while sanitizing known PII fields', () => {
    const event: Event = {
      breadcrumbs: [
        {
          category: 'auth',
          message: 'callback for michael@example.com token=secret',
          data: {
            url: '/callback?code=abc&token=secret',
            contact: {
              phoneNumber: '+16505551234',
            },
            nested: {
              level1: {
                level2: {
                  level3: {
                    level4: {
                      level5: {
                        level6: {
                          trace: 'preserved',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      ],
      contexts: {
        auth: {
          nested: {
            level1: {
              level2: {
                level3: {
                  level4: {
                    level5: {
                      level6: {
                        trace: 'preserved',
                      },
                    },
                  },
                },
              },
            },
          },
          userId: '12345',
        },
      },
    };

    const sanitized = sanitizeSentryEvent(event);
    const breadcrumb = sanitized.breadcrumbs?.[0];
    const contexts = sanitized.contexts as {
      auth: {
        nested: NestedTrace;
        userId: string;
      };
    };

    expect(breadcrumb?.message).toContain('callback');
    expect(breadcrumb?.message).not.toContain('michael@example.com');
    expect(breadcrumb?.message).not.toContain('secret');
    expect(breadcrumb?.message).not.toMatch(/\[PII:v2;/);
    expect(breadcrumb?.data?.url).toContain('code=[Secret:v2]');
    expect(breadcrumb?.data?.url).toContain('token=[Secret:v2]');
    expect(
      (breadcrumb?.data?.contact as { phoneNumber: string }).phoneNumber,
    ).toBe(SECRET_MARKER_V2);
    expect(
      breadcrumb?.data?.nested.level1.level2.level3.level4.level5.level6,
    ).toEqual({
      trace: 'preserved',
    });
    expect(contexts.auth.userId).toBe(SECRET_MARKER_V2);
    expect(
      contexts.auth.nested.level1.level2.level3.level4.level5.level6,
    ).toEqual({
      trace: 'preserved',
    });
    expect(JSON.stringify(sanitized.contexts)).not.toContain(OVER_DEPTH_VALUE);
    expect(JSON.stringify(sanitized)).not.toMatch(/\[PII:v2;/);
  });

  it('sanitizes extra, demotes PII keys, and survives malformed input', () => {
    const extra: Record<string, unknown> = {
      'michael@example.com': 'ok',
      contact: { phoneNumber: '+16505551234' },
      note: '[PII:v2;email;not-a-valid-preview;AAAAAAAAAAAAA] leak@example.com',
    };
    extra.self = extra;
    Object.defineProperty(extra, 'boom', {
      enumerable: true,
      get() {
        throw new Error('boom');
      },
    });

    const sanitized = sanitizeSentryEvent({ extra });
    const extraOut = sanitized.extra as Record<string, unknown>;

    expect(extraOut[SECRET_MARKER_V2]).toBe('ok');
    expect((extraOut.contact as { phoneNumber: string }).phoneNumber).toBe(
      SECRET_MARKER_V2,
    );
    expect(String(extraOut.note)).not.toContain('leak@example.com');
    expect(extraOut.boom).toBeDefined();
    expect(() => JSON.stringify(sanitized.extra)).not.toThrow();
    expect(JSON.stringify(sanitized)).not.toMatch(/\[PII:v2;/);
  });

  it('preserves colliding demoted PII keys', () => {
    const sanitized = sanitizeSentryEvent({
      extra: {
        'alice@example.com': 'first',
        'bob@example.com': 'second',
      },
    });
    const extra = sanitized.extra as Record<string, string>;

    expect(extra[SECRET_MARKER_V2]).toBe('first');
    expect(extra[`${SECRET_MARKER_V2}~2`]).toBe('second');
  });
});
