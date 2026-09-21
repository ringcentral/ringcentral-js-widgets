import type { LogSanitizationPolicy } from './logSanitizationPolicy';

export interface SanitizeLogOptions {
  depth?: number;
  excludes?: string[];
  sensitiveWords?: string[];
  maskWords?: string[];
  hashSalt?: string;
  /** Override installation/device key for refs. Tests and SharedWorker init. */
  deviceKey?: Uint8Array;
}

export const DIAGNOSTIC_LOG_VALUE_MARK: unique symbol = Symbol(
  'rcLogDiagnosticValue',
);

export interface DiagnosticLogValue<T> {
  readonly [DIAGNOSTIC_LOG_VALUE_MARK]: true;
  readonly value: T;
  readonly reason?: string;
}

export type SanitizeContext = Required<Pick<SanitizeLogOptions, 'depth'>> & {
  sensitiveKeys: Set<string>;
  customSensitiveKeys: Set<string>;
  maskKeys: Set<string>;
  hashSalt: string;
  deviceKey: Uint8Array;
  seen: WeakSet<object>;
  // Shared mutable node budget guarding total sanitize work per logger call.
  budget: { nodes: number };
};

export interface SanitizeScope {
  diagnostic?: boolean;
  piiContainer?: boolean;
  addressContainer?: boolean;
  metadata?: boolean;
  hash?: boolean;
  // Every scalar leaf below this scope is fully hidden; containers still recurse
  // so structured shape is preserved without exposing values.
  secret?: boolean;
  path?: readonly string[];
  policy?: LogSanitizationPolicy;
}

export interface SanitizeFieldValueArgs {
  key: string;
  value: unknown;
  context: SanitizeContext;
  currentDepth: number;
  scope: SanitizeScope;
}

export interface SanitizeRequestBodyDependencies {
  normalizeKey: (key: string) => string;
  sanitizeData: (
    data: unknown,
    context: SanitizeContext,
    currentDepth: number,
    parentKey?: string,
    scope?: SanitizeScope,
  ) => unknown;
  sanitizeFieldValue: (args: SanitizeFieldValueArgs) => unknown;
  sanitizeLabelText: (value: string, context?: SanitizeContext) => string;
  sanitizeLogTextWithContext: (
    value: string,
    context: SanitizeContext,
  ) => string;
}

export interface ParsedMultipartHeaders {
  values: Map<string, string>;
  sanitized: string;
}

export interface MultipartPartBodyContext {
  body: string;
  bodyKey: string;
  contentDisposition: string;
  contentTransferEncoding: string;
  contentType: string;
  fieldName: string | undefined;
  context: SanitizeContext;
  currentDepth: number;
  scope: SanitizeScope;
  sanitizer: SanitizeRequestBodyDependencies;
}

export interface SanitizeFieldValueContext {
  key: string;
  value: unknown;
  normalizedKey: string;
  fieldValue: unknown;
  fieldScope: SanitizeScope;
  context: SanitizeContext;
  currentDepth: number;
  isDiagnosticValue: boolean;
  recurse: (childScope: SanitizeScope) => unknown;
}
