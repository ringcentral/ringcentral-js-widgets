import {
  SERIALIZED_LOG_SANITIZATION_POLICY_KEY,
  createSerializedLogSanitizationPolicyMarker,
  getLogSanitizationPolicy,
  getSerializedLogSanitizationPolicyId,
  isLogParamsWithSanitizationPolicy,
} from './logSanitizationPolicy';
import type { LogSanitizationPolicy } from './logSanitizationPolicy';
import {
  isBinaryBodyValue,
  sanitizeRequestBodyString,
} from './piiSanitizer.body';
import * as sanitizerConstants from './piiSanitizer.constants';
import { createContext, createRootContext } from './piiSanitizer.context';
import type {
  SanitizeContext,
  SanitizeFieldValueContext,
  SanitizeLogOptions,
  SanitizeRequestBodyDependencies,
  SanitizeScope,
} from './piiSanitizer.interface';
import {
  maskString,
  maskCallId,
  maskIP,
  sanitizeLogText,
  sanitizeLogTextWithContext,
  sanitizeLabelText,
  isDiagnosticLogValue,
  hasTextSanitizeSignal,
  redactTokenValue,
  sanitizeUrlValue,
} from './piiSanitizer.text';
import {
  BINARY_MARKER_V2,
  UNAVAILABLE_MARKER_V2,
  isCanonicalPiiMarker,
  redactEmail,
  redactPersonName,
  redactPhone,
  redactRestricted,
  redactSecret,
  redactUserId,
  redactUsername,
  redactMac,
} from './piiV2';
import type { RestrictedPiiType } from './piiV2';

const {
  EMPTY_WORDS,
  DEFAULT_SANITIZE_OPTIONS,
  ADDRESS_SCOPED_SENSITIVE_WORDS,
  URL_VALUE_KEYS,
  TRACK_EVENT_LOG_NAME,
  TRACK_EVENT_NAME_INDEX,
  TRACK_EVENT_PROPS_INDEX,
  TRACK_EVENT_PROPS_PARENT_KEY,
  TRACK_EVENT_LABEL_KEYS,
  normalizeKey,
  createKeySet,
  piiContainerKeys,
  addressContainerKeys,
  secretKeys,
  tokenKeys,
  emailKeys,
  phoneKeys,
  personNameKeys,
  usernameKeys,
  addressLeafKeys,
  ssnKeys,
  creditCardKeys,
  hashIdentifierKeys,
  diagnosticAllowedKeys,
  macKeys,
  ipKeys,
} = sanitizerConstants;

export { MASK_WORDS, SENSITIVE_WORDS } from './piiSanitizer.constants';
export {
  diagnosticLogValue,
  hashLogIdentifier,
  maskCallId,
  maskEmail,
  maskIP,
  maskPhone,
  maskQuery,
  maskSipMessage,
  maskSipUri,
  maskString,
  sanitizeLogText,
} from './piiSanitizer.text';

export type {
  DiagnosticLogValue,
  SanitizeLogOptions,
} from './piiSanitizer.interface';

export const CIRCULAR_VALUE = '[Circular~]';
export const OVER_DEPTH_VALUE = '[OverDepth]';
export const OVER_BUDGET_VALUE = '[OverBudget]';
export { UNAVAILABLE_MARKER_V2 } from './piiV2';
export {
  PII_MARKER_VERSION,
  BINARY_MARKER_V2,
  SECRET_MARKER_V2,
  ensurePiiDeviceKey,
  isCanonicalFilenameSafePiiMarker,
  preserveFilenameSafeMarkers,
  replaceContentMarkersWithFilenameSafe,
  resetPiiDeviceKeyForTests,
  setPiiDeviceKeyForTests,
  toFilenameSafePiiMarker,
} from './piiV2';
const maskValue = (value: unknown, context: SanitizeContext) => {
  if (typeof value === 'string') {
    return maskString(sanitizeLogTextWithContext(value, context));
  }

  return redactSecret();
};

const isTrackEventLabelKey = (parentKey: string | undefined, key: string) =>
  parentKey === TRACK_EVENT_PROPS_PARENT_KEY &&
  TRACK_EVENT_LABEL_KEYS.has(normalizeKey(key));

const piiScopedSensitiveKeys = createKeySet([
  'id',
  'name',
  'from',
  'to',
  'text',
  'title',
  'subject',
  'message',
]);
const addressScopedSensitiveKeys = createKeySet([
  ...ADDRESS_SCOPED_SENSITIVE_WORDS,
]);

const isObjectLike = (value: unknown) =>
  value !== null && typeof value === 'object';

// A container we recurse into to preserve shape. Errors and Dates are handled
// as their own leaf-like normalizations in sanitizeData.
const isPlainContainer = (value: unknown) =>
  isObjectLike(value) && !(value instanceof Error) && !(value instanceof Date);

const isPolicyPath = (
  paths: readonly (readonly string[])[] | undefined,
  path: readonly string[],
) =>
  paths?.some(
    (metadataPath) =>
      metadataPath.length === path.length &&
      metadataPath.every(
        (segment, index) => segment === '*' || segment === path[index],
      ),
  ) ?? false;

const getFieldScope = (scope: SanitizeScope, key: string): SanitizeScope => {
  if (!scope.policy) return scope;

  const path = [...(scope.path ?? []), key];

  return {
    ...scope,
    hash: isPolicyPath(scope.policy.hashPaths, path),
    metadata: scope.metadata || isPolicyPath(scope.policy.metadataPaths, path),
    path,
  };
};

const isMetadataUrl = (value: string) =>
  /^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(value) || value.startsWith('/');

const shouldFilterContainerArrayItem = (value: unknown, scope: SanitizeScope) =>
  (scope.piiContainer || scope.addressContainer) && !isObjectLike(value);

const NOT_HANDLED = Symbol('not-handled');

const requestBodySanitizer: SanitizeRequestBodyDependencies = {
  normalizeKey,
  sanitizeData,
  sanitizeFieldValue,
  sanitizeLabelText,
  sanitizeLogTextWithContext,
};

function sanitizeBodyFieldValue({
  key,
  fieldValue,
  fieldScope,
  context,
  currentDepth,
  normalizedKey,
}: SanitizeFieldValueContext): unknown {
  const isBodyField =
    normalizedKey === 'requestbody' || normalizedKey === 'responsebody';

  if (!isBodyField) {
    return NOT_HANDLED;
  }

  if (
    fieldScope.secret &&
    (typeof fieldValue === 'string' || isBinaryBodyValue(fieldValue))
  ) {
    return redactSecret();
  }

  if (isBinaryBodyValue(fieldValue)) {
    return BINARY_MARKER_V2;
  }

  if (typeof fieldValue === 'string') {
    return sanitizeRequestBodyString({
      value: fieldValue,
      context,
      currentDepth,
      scope: fieldScope,
      bodyKey: key,
      sanitizer: requestBodySanitizer,
    });
  }

  return NOT_HANDLED;
}

const sanitizeSecretScopeValue = (
  fieldValue: unknown,
  fieldScope: SanitizeScope,
  recurse: (childScope: SanitizeScope) => unknown,
  forceSecret: boolean,
) => {
  if (!isPlainContainer(fieldValue)) {
    return redactSecret();
  }

  const childScope = forceSecret ? { ...fieldScope, secret: true } : fieldScope;
  return recurse(childScope);
};

const sanitizeTokenScopeValue = (
  key: string,
  fieldValue: unknown,
  fieldScope: SanitizeScope,
  context: SanitizeContext,
  recurse: (childScope: SanitizeScope) => unknown,
) => {
  if (isPlainContainer(fieldValue)) {
    return recurse({ ...fieldScope, secret: true });
  }

  return typeof fieldValue === 'string'
    ? redactTokenValue(key, fieldValue, context.deviceKey)
    : redactSecret();
};

const sanitizeHashScopeValue = (
  fieldValue: unknown,
  fieldScope: SanitizeScope,
  context: SanitizeContext,
  recurse: (childScope: SanitizeScope) => unknown,
) =>
  isPlainContainer(fieldValue)
    ? recurse(fieldScope)
    : redactUserId(String(fieldValue), context.deviceKey);

const sanitizeMetadataScopeValue = (
  key: string,
  normalizedKey: string,
  fieldValue: unknown,
  fieldScope: SanitizeScope,
  context: SanitizeContext,
  recurse: (childScope: SanitizeScope) => unknown,
) => {
  if (
    typeof fieldValue === 'string' &&
    (URL_VALUE_KEYS.has(normalizedKey) || isMetadataUrl(fieldValue))
  ) {
    return sanitizeUrlValue(key, fieldValue, context);
  }

  return recurse(fieldScope);
};

function sanitizeFieldScopeValue({
  key,
  normalizedKey,
  fieldValue,
  fieldScope,
  context,
  recurse,
}: SanitizeFieldValueContext) {
  if (fieldScope.secret) {
    return sanitizeSecretScopeValue(fieldValue, fieldScope, recurse, false);
  }

  if (secretKeys.has(normalizedKey)) {
    return sanitizeSecretScopeValue(fieldValue, fieldScope, recurse, true);
  }

  if (tokenKeys.has(normalizedKey)) {
    return sanitizeTokenScopeValue(
      key,
      fieldValue,
      fieldScope,
      context,
      recurse,
    );
  }

  if (
    fieldScope.hash ||
    hashIdentifierKeys.has(normalizedKey) ||
    (fieldScope.piiContainer && normalizedKey === 'id')
  ) {
    return sanitizeHashScopeValue(fieldValue, fieldScope, context, recurse);
  }

  if (fieldScope.metadata) {
    return sanitizeMetadataScopeValue(
      key,
      normalizedKey,
      fieldValue,
      fieldScope,
      context,
      recurse,
    );
  }

  return NOT_HANDLED;
}

function sanitizeKnownStringValue(
  { fieldValue, fieldScope, recurse }: SanitizeFieldValueContext,
  redactValue: (value: string) => string,
  childScope: Partial<SanitizeScope> = { secret: true },
) {
  if (isPlainContainer(fieldValue)) {
    return recurse({ ...fieldScope, ...childScope });
  }

  if (typeof fieldValue === 'string') {
    return redactValue(fieldValue);
  }

  return redactSecret();
}

function sanitizeKnownRestrictedValue(
  { fieldValue, fieldScope, recurse }: SanitizeFieldValueContext,
  restriction: RestrictedPiiType,
  childScope: Partial<SanitizeScope> = { secret: true },
) {
  if (isPlainContainer(fieldValue)) {
    return recurse({ ...fieldScope, ...childScope });
  }

  return redactRestricted(restriction);
}

function sanitizeKnownTextValue(
  { fieldValue, fieldScope, recurse }: SanitizeFieldValueContext,
  sanitizeValue: (value: string) => string,
) {
  if (isPlainContainer(fieldValue)) {
    return recurse(fieldScope);
  }

  if (typeof fieldValue === 'string') {
    return sanitizeValue(fieldValue);
  }

  return redactSecret();
}

function sanitizeKnownFieldValue(fieldContext: SanitizeFieldValueContext) {
  const { normalizedKey, context } = fieldContext;

  if (emailKeys.has(normalizedKey)) {
    return sanitizeKnownStringValue(fieldContext, (value) =>
      redactEmail(value, context.deviceKey),
    );
  }

  if (phoneKeys.has(normalizedKey)) {
    return sanitizeKnownStringValue(
      fieldContext,
      (value) => redactPhone(value, context.deviceKey),
      normalizedKey === 'phonenumbers'
        ? { piiContainer: true }
        : { secret: true },
    );
  }

  if (usernameKeys.has(normalizedKey)) {
    return sanitizeKnownStringValue(fieldContext, (value) =>
      redactUsername(value, context.deviceKey),
    );
  }

  if (personNameKeys.has(normalizedKey)) {
    return sanitizeKnownStringValue(fieldContext, (value) =>
      redactPersonName(value, context.deviceKey),
    );
  }

  if (
    addressLeafKeys.has(normalizedKey) &&
    !addressContainerKeys.has(normalizedKey)
  ) {
    return sanitizeKnownRestrictedValue(fieldContext, 'address', {
      addressContainer: true,
    });
  }

  if (ssnKeys.has(normalizedKey)) {
    return sanitizeKnownRestrictedValue(fieldContext, 'ssn');
  }

  if (creditCardKeys.has(normalizedKey)) {
    return sanitizeKnownRestrictedValue(fieldContext, 'credit-card');
  }

  if (macKeys.has(normalizedKey)) {
    return sanitizeKnownTextValue(fieldContext, (value) =>
      redactMac(value, context.deviceKey),
    );
  }

  if (ipKeys.has(normalizedKey)) {
    return sanitizeKnownTextValue(fieldContext, (value) =>
      maskIP(value, context.deviceKey),
    );
  }

  return NOT_HANDLED;
}

function sanitizeContainerFieldValue({
  normalizedKey,
  fieldValue,
  fieldScope,
  recurse,
}: SanitizeFieldValueContext) {
  if (piiContainerKeys.has(normalizedKey)) {
    if (!isObjectLike(fieldValue)) {
      return redactSecret();
    }

    return recurse({ ...fieldScope, piiContainer: true });
  }

  if (addressContainerKeys.has(normalizedKey)) {
    if (!isObjectLike(fieldValue)) {
      return redactRestricted('address');
    }

    return recurse({ ...fieldScope, addressContainer: true });
  }

  return NOT_HANDLED;
}

function sanitizeAddressScopedFieldValue({
  key,
  normalizedKey,
  fieldValue,
  fieldScope,
  context,
  recurse,
}: SanitizeFieldValueContext) {
  if (
    !fieldScope.addressContainer ||
    !addressScopedSensitiveKeys.has(normalizedKey)
  ) {
    return NOT_HANDLED;
  }

  if (isPlainContainer(fieldValue)) {
    return recurse(fieldScope);
  }

  if (normalizedKey === 'id') {
    return redactUserId(String(fieldValue), context.deviceKey);
  }

  if (personNameKeys.has(normalizedKey) || normalizedKey === 'name') {
    return typeof fieldValue === 'string'
      ? redactPersonName(fieldValue, context.deviceKey)
      : redactRestricted('address');
  }

  if (
    normalizedKey === 'uri' ||
    normalizedKey === 'url' ||
    normalizedKey === 'href'
  ) {
    return typeof fieldValue === 'string'
      ? sanitizeUrlValue(key, fieldValue, context)
      : redactRestricted('address');
  }

  return redactRestricted('address');
}

const sanitizeUrlScopedFieldValue = ({
  key,
  normalizedKey,
  fieldValue,
  fieldScope,
  context,
  recurse,
}: SanitizeFieldValueContext) => {
  if (!URL_VALUE_KEYS.has(normalizedKey)) {
    return NOT_HANDLED;
  }

  if (typeof fieldValue === 'string') {
    return sanitizeUrlValue(key, fieldValue, context);
  }

  return isPlainContainer(fieldValue) ? recurse(fieldScope) : redactSecret();
};

const sanitizePiiScopedFieldValue = ({
  normalizedKey,
  fieldValue,
  fieldScope,
  context,
  recurse,
}: SanitizeFieldValueContext) => {
  if (!fieldScope.piiContainer || !piiScopedSensitiveKeys.has(normalizedKey)) {
    return NOT_HANDLED;
  }

  if (isPlainContainer(fieldValue)) {
    return recurse(fieldScope);
  }

  if (normalizedKey === 'id') {
    return redactUserId(String(fieldValue), context.deviceKey);
  }

  if (normalizedKey === 'name') {
    return typeof fieldValue === 'string'
      ? redactPersonName(fieldValue, context.deviceKey)
      : redactSecret();
  }

  return redactSecret();
};

const sanitizeCallIdFieldValue = (key: string, fieldValue: unknown) =>
  (key === 'callId' || key === 'sipCallId') && typeof fieldValue === 'string'
    ? maskCallId(fieldValue)
    : NOT_HANDLED;

const sanitizeDiagnosticScopedFieldValue = ({
  normalizedKey,
  fieldScope,
  isDiagnosticValue,
  recurse,
}: SanitizeFieldValueContext) =>
  (fieldScope.diagnostic || isDiagnosticValue) &&
  diagnosticAllowedKeys.has(normalizedKey)
    ? recurse({ ...fieldScope, diagnostic: true })
    : NOT_HANDLED;

function sanitizeScopedFieldValue(fieldContext: SanitizeFieldValueContext) {
  const addressValue = sanitizeAddressScopedFieldValue(fieldContext);
  if (addressValue !== NOT_HANDLED) return addressValue;

  const urlValue = sanitizeUrlScopedFieldValue(fieldContext);
  if (urlValue !== NOT_HANDLED) return urlValue;

  const piiValue = sanitizePiiScopedFieldValue(fieldContext);
  if (piiValue !== NOT_HANDLED) return piiValue;

  const callIdValue = sanitizeCallIdFieldValue(
    fieldContext.key,
    fieldContext.fieldValue,
  );
  if (callIdValue !== NOT_HANDLED) return callIdValue;

  return sanitizeDiagnosticScopedFieldValue(fieldContext);
}

const sanitizeSensitiveFallbackValue = ({
  normalizedKey,
  fieldValue,
  fieldScope,
  context,
  recurse,
}: SanitizeFieldValueContext) => {
  if (isPlainContainer(fieldValue)) {
    return recurse(
      context.customSensitiveKeys.has(normalizedKey)
        ? { ...fieldScope, secret: true }
        : fieldScope,
    );
  }

  if (typeof fieldValue !== 'string') {
    return redactSecret();
  }

  if (phoneKeys.has(normalizedKey)) {
    return redactPhone(fieldValue, context.deviceKey);
  }

  if (personNameKeys.has(normalizedKey)) {
    return redactPersonName(fieldValue, context.deviceKey);
  }

  if (usernameKeys.has(normalizedKey)) {
    return redactUsername(fieldValue, context.deviceKey);
  }

  if (addressLeafKeys.has(normalizedKey)) {
    return redactRestricted('address');
  }

  return redactSecret();
};

function sanitizeFallbackFieldValue(fieldContext: SanitizeFieldValueContext) {
  const { value, normalizedKey, fieldValue, fieldScope, context, recurse } =
    fieldContext;

  if (context.maskKeys.has(normalizedKey)) {
    return isPlainContainer(fieldValue)
      ? recurse(fieldScope)
      : maskValue(value, context);
  }

  if (context.sensitiveKeys.has(normalizedKey)) {
    return sanitizeSensitiveFallbackValue(fieldContext);
  }

  return NOT_HANDLED;
}

function sanitizeFieldValue({
  key,
  value,
  context,
  currentDepth,
  scope,
}: {
  key: string;
  value: unknown;
  context: SanitizeContext;
  currentDepth: number;
  scope: SanitizeScope;
}): unknown {
  const normalizedKey = normalizeKey(key);
  const isDiagnosticValue = isDiagnosticLogValue(value);
  const fieldValue = isDiagnosticValue ? value.value : value;
  const fieldScope = getFieldScope(scope, key);
  const recurse = (childScope: SanitizeScope) =>
    sanitizeData(fieldValue, context, currentDepth + 1, key, childScope);

  if (key === SERIALIZED_LOG_SANITIZATION_POLICY_KEY) {
    return redactSecret();
  }

  if (typeof fieldValue === 'string' && isCanonicalPiiMarker(fieldValue)) {
    return fieldValue;
  }

  const fieldContext: SanitizeFieldValueContext = {
    key,
    value,
    normalizedKey,
    fieldValue,
    fieldScope,
    context,
    currentDepth,
    isDiagnosticValue,
    recurse,
  };

  const bodyValue: unknown = sanitizeBodyFieldValue(fieldContext);
  if (bodyValue !== NOT_HANDLED) return bodyValue;

  const scopeValue = sanitizeFieldScopeValue(fieldContext);
  if (scopeValue !== NOT_HANDLED) return scopeValue;

  const knownValue = sanitizeKnownFieldValue(fieldContext);
  if (knownValue !== NOT_HANDLED) return knownValue;

  const containerValue = sanitizeContainerFieldValue(fieldContext);
  if (containerValue !== NOT_HANDLED) return containerValue;

  const scopedValue = sanitizeScopedFieldValue(fieldContext);
  if (scopedValue !== NOT_HANDLED) return scopedValue;

  const fallbackValue = sanitizeFallbackFieldValue(fieldContext);
  if (fallbackValue !== NOT_HANDLED) return fallbackValue;

  return recurse(fieldScope);
}

// Renames a key whose own text carries PII (e.g. an email/phone used as a map
// key), then resolves collisions deterministically with `~2`, `~3`, … so a
// renamed key never overwrites or drops an existing entry.
function resolveOutputKey(
  key: string,
  result: Record<string, unknown>,
  context: SanitizeContext,
) {
  const sanitizedKey =
    key && hasTextSanitizeSignal(key) ? sanitizeLabelText(key, context) : key;

  if (!Object.prototype.hasOwnProperty.call(result, sanitizedKey)) {
    return sanitizedKey;
  }

  let suffix = 2;
  let candidate = `${sanitizedKey}~${suffix}`;
  while (Object.prototype.hasOwnProperty.call(result, candidate)) {
    suffix += 1;
    candidate = `${sanitizedKey}~${suffix}`;
  }
  return candidate;
}

function sanitizeObject(
  data: Record<string, unknown>,
  context: SanitizeContext,
  currentDepth: number,
  parentKey?: string,
  scope: SanitizeScope = {},
) {
  if (context.seen.has(data)) {
    return CIRCULAR_VALUE;
  }

  context.seen.add(data);

  const result = Object.create(null) as Record<string, unknown>;

  Object.keys(data).forEach((key) => {
    // A throwing getter must not remove sibling fields or other logger params.
    let sanitizedValue: unknown;
    try {
      const value = data[key];

      sanitizedValue = isTrackEventLabelKey(parentKey, key)
        ? sanitizeData(value, context, currentDepth + 1, key, scope)
        : sanitizeFieldValue({
            key,
            value,
            context,
            currentDepth,
            scope,
          });
    } catch {
      sanitizedValue = UNAVAILABLE_MARKER_V2;
    }

    result[resolveOutputKey(key, result, context)] = sanitizedValue;
  });

  context.seen.delete(data);

  return result;
}

function sanitizeError(error: Error, context: SanitizeContext) {
  const result: Record<string, unknown> = {
    name: error.name,
    message: sanitizeLogTextWithContext(error.message, context),
  };

  if (error.stack) {
    result.stack = sanitizeLogTextWithContext(error.stack, context);
  }

  Object.keys(error).forEach((key) => {
    result[key] = sanitizeFieldValue({
      key,
      value: (error as unknown as Record<string, unknown>)[key],
      context,
      currentDepth: 0,
      scope: {},
    });
  });

  return result;
}

function sanitizeArrayItem({
  item,
  context,
  currentDepth,
  parentKey,
  scope,
}: {
  item: unknown;
  context: SanitizeContext;
  currentDepth: number;
  parentKey?: string;
  scope: SanitizeScope;
}) {
  if (shouldFilterContainerArrayItem(item, scope)) {
    if (scope.addressContainer) {
      return redactRestricted('address');
    }
    return redactSecret();
  }

  return sanitizeData(item, context, currentDepth + 1, parentKey, scope);
}

function sanitizeArray(
  data: unknown[],
  context: SanitizeContext,
  currentDepth: number,
  parentKey: string | undefined,
  scope: SanitizeScope,
) {
  if (context.seen.has(data)) {
    return CIRCULAR_VALUE;
  }

  context.seen.add(data);
  const result = data.map((item) =>
    sanitizeArrayItem({ item, context, currentDepth, parentKey, scope }),
  );
  context.seen.delete(data);

  return result;
}

function sanitizePrimitiveDataValue(data: unknown, context: SanitizeContext) {
  if (data instanceof Error) {
    return sanitizeError(data, context);
  }

  if (data instanceof Date) {
    return data.toISOString();
  }

  if (typeof data === 'string') {
    return sanitizeLogTextWithContext(data, context);
  }

  if (typeof data === 'bigint') {
    return data.toString();
  }

  if (typeof data === 'function') {
    return data.name ? `[Function ${data.name}]` : '[Function]';
  }

  return data === null || typeof data !== 'object' ? data : NOT_HANDLED;
}

function sanitizeSpecialContainerDataValue(
  data: unknown,
  context: SanitizeContext,
  currentDepth: number,
  parentKey: string | undefined,
  scope: SanitizeScope,
) {
  if (data instanceof Map) {
    return sanitizeData(
      Array.from(data.entries()),
      context,
      currentDepth,
      parentKey,
      scope,
    );
  }

  if (data instanceof Set) {
    return sanitizeData(
      Array.from(data.values()),
      context,
      currentDepth,
      parentKey,
      scope,
    );
  }

  if (data instanceof RegExp) {
    return data.toString();
  }

  if (ArrayBuffer.isView(data) || data instanceof ArrayBuffer) {
    const size =
      'byteLength' in data ? (data as ArrayBufferView).byteLength : undefined;
    return `[${data.constructor?.name ?? 'Binary'}${
      size === undefined ? '' : ` byteLength=${size}`
    }]`;
  }

  return NOT_HANDLED;
}

function sanitizeDataValue(
  data: unknown,
  context: SanitizeContext,
  currentDepth: number,
  parentKey: string | undefined,
  scope: SanitizeScope,
): unknown {
  const primitiveValue = sanitizePrimitiveDataValue(data, context);
  if (primitiveValue !== NOT_HANDLED) return primitiveValue;

  // Normalize container-like values JSON.stringify would drop or throw on, so a
  // single exotic value cannot break the whole logger call.
  const specialContainerValue = sanitizeSpecialContainerDataValue(
    data,
    context,
    currentDepth,
    parentKey,
    scope,
  );
  if (specialContainerValue !== NOT_HANDLED) return specialContainerValue;

  if (Array.isArray(data)) {
    return sanitizeArray(data, context, currentDepth, parentKey, scope);
  }

  return sanitizeObject(
    data as Record<string, unknown>,
    context,
    currentDepth,
    parentKey,
    scope,
  );
}

function sanitizeData(
  data: unknown,
  context: SanitizeContext,
  currentDepth: number,
  parentKey?: string,
  scope: SanitizeScope = {},
): unknown {
  if (context.budget.nodes <= 0) {
    return OVER_BUDGET_VALUE;
  }
  context.budget.nodes -= 1;

  if (currentDepth > context.depth) {
    return OVER_DEPTH_VALUE;
  }

  // Fully-hidden scope: recurse containers to keep shape, hide every scalar.
  if (scope.secret && !isPlainContainer(data) && !isDiagnosticLogValue(data)) {
    return redactSecret();
  }

  if (isDiagnosticLogValue(data)) {
    return sanitizeData(data.value, context, currentDepth, parentKey, {
      ...scope,
      diagnostic: true,
    });
  }

  return sanitizeDataValue(data, context, currentDepth, parentKey, scope);
}

export function sanitizeLogData<T>(
  data: T,
  excludes: string[] = EMPTY_WORDS,
  options: SanitizeLogOptions = DEFAULT_SANITIZE_OPTIONS,
) {
  return sanitizeData(data, createContext(excludes, options), 0) as T;
}

function sanitizeTrackEventParams(params: unknown[]) {
  const context = createContext();

  return params.map((item, index) => {
    if (index === TRACK_EVENT_NAME_INDEX && typeof item === 'string') {
      return sanitizeLabelText(item);
    }

    if (index === TRACK_EVENT_PROPS_INDEX) {
      return sanitizeData(item, context, 0, TRACK_EVENT_PROPS_PARENT_KEY);
    }

    return sanitizeData(item, context, 0);
  });
}

const isTrackEventParams = (params: unknown[]) =>
  params[0] === TRACK_EVENT_LOG_NAME;

const sanitizeLogParamsWithPolicy = (
  params: readonly unknown[],
  policy: LogSanitizationPolicy,
) => {
  const sharedContext = createContext(
    EMPTY_WORDS,
    policy.depth === undefined
      ? DEFAULT_SANITIZE_OPTIONS
      : { depth: policy.depth },
  );

  return params.map((item) =>
    sanitizeData(item, createRootContext(sharedContext), 0, undefined, {
      path: [],
      policy,
    }),
  );
};

/** Re-sanitizes one serialized BrowserLogger message and removes its marker. */
export const sanitizeSerializedLogParams = (value: unknown) => {
  if (!Array.isArray(value) || value.length < 2) return undefined;

  const policyId = getSerializedLogSanitizationPolicyId(
    value[value.length - 1],
  );
  if (!policyId) return undefined;

  const policy = getLogSanitizationPolicy(policyId);
  if (!policy) return undefined;

  return sanitizeLogParamsWithPolicy(value.slice(0, -1), policy);
};

export function sanitizeLogParams(params: unknown[] | string) {
  if (typeof params === 'string') {
    return sanitizeLogText(params);
  }

  if (isTrackEventParams(params)) {
    return sanitizeTrackEventParams(params);
  }

  if (params.length === 1 && isLogParamsWithSanitizationPolicy(params[0])) {
    const policyParams = params[0];
    const policy = getLogSanitizationPolicy(policyParams.policyId);

    if (!policy) {
      return sanitizeLogParams([...policyParams.params]);
    }

    const sanitizedParams = sanitizeLogParamsWithPolicy(
      policyParams.params,
      policy,
    );

    return [
      ...sanitizedParams,
      createSerializedLogSanitizationPolicyMarker(policy.id),
    ];
  }

  const sharedContext = createContext();

  return params.map((item) =>
    sanitizeData(item, createRootContext(sharedContext), 0),
  );
}
