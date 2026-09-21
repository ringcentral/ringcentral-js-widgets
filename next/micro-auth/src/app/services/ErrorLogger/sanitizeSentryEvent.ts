import {
  SECRET_MARKER_V2,
  sanitizeLogData,
  sanitizeLogText,
} from '@ringcentral-integration/next-core';
import type { Event } from '@sentry/types';

// Extra keys forced to Secret before specialized correlatable branches.
// Remaining correlatable markers are demoted in the final Sentry pass.
const SENTRY_USER_EXCLUDES = ['id', 'ip_address'];

const SENTRY_FIELD_SANITIZE_DEPTH = 20;
const SENTRY_FIELD_SANITIZE_OPTIONS = {
  depth: SENTRY_FIELD_SANITIZE_DEPTH,
};

// Shared sanitizer emits correlatable v2 markers; Sentry gets no preview/ref.
const CORRELATABLE_PII_MARKER_REGEX =
  /\[PII:v2;[a-z0-9-]+;[^;\]]*;[A-Z2-7]{13}\]/g;

type SentryLogEntry = NonNullable<Event['logentry']>;
type SentryRequest = NonNullable<Event['request']>;
type SentryTags = NonNullable<Event['tags']>;
type SentryBreadcrumb = NonNullable<Event['breadcrumbs']>[number];
type SentryException = NonNullable<
  NonNullable<Event['exception']>['values']
>[number];
type SentryStacktrace = NonNullable<SentryException['stacktrace']>;
type SentryStackFrame = NonNullable<SentryStacktrace['frames']>[number];
type SentryThread = NonNullable<
  NonNullable<Event['threads']>['values']
>[number];

const sanitizeFieldData = <T>(data: T) =>
  sanitizeLogData(data, [], SENTRY_FIELD_SANITIZE_OPTIONS);

const demoteCorrelatableMarkers = (value: string) =>
  value.replace(CORRELATABLE_PII_MARKER_REGEX, SECRET_MARKER_V2);

const resolveOutputKey = (key: string, result: Record<string, unknown>) => {
  if (!(key in result)) {
    return key;
  }

  let suffix = 2;
  let candidate = `${key}~${suffix}`;
  while (candidate in result) {
    suffix += 1;
    candidate = `${key}~${suffix}`;
  }
  return candidate;
};

const demoteCorrelatableForSentry = (value: unknown): unknown => {
  if (typeof value === 'string') {
    return demoteCorrelatableMarkers(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => demoteCorrelatableForSentry(item));
  }

  if (value !== null && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    Object.entries(value as Record<string, unknown>).forEach(([key, entry]) => {
      const demotedKey = resolveOutputKey(
        demoteCorrelatableMarkers(key),
        result,
      );
      result[demotedKey] = demoteCorrelatableForSentry(entry);
    });
    return result;
  }

  return value;
};

const sanitizeRequestCookies = (
  cookies: NonNullable<SentryRequest['cookies']>,
) =>
  Object.keys(cookies).reduce<NonNullable<SentryRequest['cookies']>>(
    (result, key) => {
      result[key] = SECRET_MARKER_V2;
      return result;
    },
    {},
  );

const sanitizeLogEntry = (logentry: SentryLogEntry): SentryLogEntry => {
  const sanitized = { ...logentry };

  if (logentry.message) {
    sanitized.message = sanitizeLogText(logentry.message);
  }

  if (logentry.params) {
    sanitized.params = logentry.params.map((param) =>
      typeof param === 'string'
        ? sanitizeLogText(param)
        : sanitizeFieldData(param),
    );
  }

  return sanitized;
};

const sanitizeRequest = (request: SentryRequest): SentryRequest => {
  const sanitized = { ...request };

  if (request.url) {
    sanitized.url = sanitizeLogText(request.url);
  }

  if (request.query_string) {
    sanitized.query_string =
      typeof request.query_string === 'string'
        ? sanitizeLogText(request.query_string)
        : sanitizeFieldData(request.query_string);
  }

  if (request.headers) {
    sanitized.headers = sanitizeFieldData(request.headers);
  }

  if (request.cookies) {
    sanitized.cookies = sanitizeRequestCookies(request.cookies);
  }

  if (request.env) {
    sanitized.env = sanitizeFieldData(request.env);
  }

  if (request.data !== undefined) {
    sanitized.data = sanitizeFieldData(request.data);
  }

  return sanitized;
};

const sanitizeBreadcrumb = (breadcrumb: SentryBreadcrumb): SentryBreadcrumb => {
  const sanitized = { ...breadcrumb };

  if (breadcrumb.message) {
    sanitized.message = sanitizeLogText(breadcrumb.message);
  }

  if (breadcrumb.data) {
    sanitized.data = sanitizeFieldData(breadcrumb.data);
  }

  return sanitized;
};

const sanitizeStackFrame = (frame: SentryStackFrame): SentryStackFrame => {
  const sanitized = { ...frame };

  if (frame.context_line) {
    sanitized.context_line = sanitizeLogText(frame.context_line);
  }

  if (frame.pre_context) {
    sanitized.pre_context = frame.pre_context.map((context) =>
      sanitizeLogText(context),
    );
  }

  if (frame.post_context) {
    sanitized.post_context = frame.post_context.map((context) =>
      sanitizeLogText(context),
    );
  }

  if (frame.vars) {
    sanitized.vars = sanitizeFieldData(frame.vars);
  }

  return sanitized;
};

const sanitizeStacktrace = (stacktrace: SentryStacktrace): SentryStacktrace => {
  if (!stacktrace.frames) {
    return stacktrace;
  }

  return {
    ...stacktrace,
    frames: stacktrace.frames.map((frame) => sanitizeStackFrame(frame)),
  };
};

const sanitizeException = (exception: SentryException): SentryException => {
  const sanitized = { ...exception };

  if (exception.type) {
    sanitized.type = sanitizeLogText(exception.type);
  }

  if (exception.value) {
    sanitized.value = sanitizeLogText(exception.value);
  }

  if (exception.stacktrace) {
    sanitized.stacktrace = sanitizeStacktrace(exception.stacktrace);
  }

  return sanitized;
};

const sanitizeThread = (thread: SentryThread): SentryThread => {
  const sanitized = { ...thread };

  if (thread.name) {
    sanitized.name = sanitizeLogText(thread.name);
  }

  if (thread.stacktrace) {
    sanitized.stacktrace = sanitizeStacktrace(thread.stacktrace);
  }

  return sanitized;
};

export function sanitizeSentryEvent(event: Event) {
  const sanitized: Event = { ...event };

  if (event.message) {
    sanitized.message = sanitizeLogText(event.message);
  }

  if (event.logentry) {
    sanitized.logentry = sanitizeLogEntry(event.logentry);
  }

  if (event.user) {
    sanitized.user = sanitizeLogData(event.user, SENTRY_USER_EXCLUDES);
  }

  if (event.tags) {
    // Shared sanitizer classifies PII tags; demote pass strips preview/ref.
    sanitized.tags = sanitizeFieldData(event.tags) as SentryTags;
  }

  if (event.request) {
    sanitized.request = sanitizeRequest(event.request);
  }

  if (event.breadcrumbs) {
    sanitized.breadcrumbs = event.breadcrumbs.map((breadcrumb) =>
      sanitizeBreadcrumb(breadcrumb),
    );
  }

  if (event.exception?.values) {
    sanitized.exception = {
      ...event.exception,
      values: event.exception.values.map((exception) =>
        sanitizeException(exception),
      ),
    };
  }

  if (event.threads?.values) {
    sanitized.threads = {
      ...event.threads,
      values: event.threads.values.map((thread) => sanitizeThread(thread)),
    };
  }

  if (event.contexts) {
    sanitized.contexts = sanitizeFieldData(event.contexts);
  }

  if (event.extra) {
    sanitized.extra = sanitizeFieldData(event.extra);
  }

  if (event.transaction) {
    sanitized.transaction = sanitizeLogText(event.transaction);
  }

  // Sentry is not a correlation surface — drop previews/refs after shared sanitize.
  return demoteCorrelatableForSentry(sanitized) as Event;
}
