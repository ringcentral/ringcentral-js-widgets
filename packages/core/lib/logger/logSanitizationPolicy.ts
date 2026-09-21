const LOG_SANITIZATION_POLICY_PARAMS_MARK: unique symbol = Symbol(
  'rcLogSanitizationPolicyParams',
);
const LOG_SANITIZATION_POLICY_REGISTRY_KEY = Symbol.for(
  '__RC_LOG_SANITIZATION_POLICY_REGISTRY__',
);

export const SERIALIZED_LOG_SANITIZATION_POLICY_KEY =
  '__rcLogSanitizationPolicy';
export const LOG_SANITIZATION_POLICY_VERSION = 1;
const MAX_LOG_SANITIZATION_POLICY_DEPTH = 10;

export type LogSanitizationPath = readonly string[];

export interface LogSanitizationPolicy {
  /** Stable identifier persisted with a sanitized log record. */
  readonly id: string;
  /** Maximum object depth, capped by the policy registry. */
  readonly depth?: number;
  /** Subtrees that contain configuration or schema metadata. */
  readonly metadataPaths: readonly LogSanitizationPath[];
  /** Values that must be replaced by a stable, non-reversible log hash. */
  readonly hashPaths?: readonly LogSanitizationPath[];
}

export interface LogParamsWithSanitizationPolicy {
  readonly [LOG_SANITIZATION_POLICY_PARAMS_MARK]: true;
  readonly params: readonly unknown[];
  readonly policyId: string;
}

export interface SerializedLogSanitizationPolicyMarker {
  readonly [SERIALIZED_LOG_SANITIZATION_POLICY_KEY]: {
    readonly id: string;
    readonly version: typeof LOG_SANITIZATION_POLICY_VERSION;
  };
}

const getPolicyRegistry = () => {
  const globalRegistry = globalThis as typeof globalThis & {
    [LOG_SANITIZATION_POLICY_REGISTRY_KEY]?: Map<string, LogSanitizationPolicy>;
  };

  globalRegistry[LOG_SANITIZATION_POLICY_REGISTRY_KEY] ??= new Map();
  return globalRegistry[LOG_SANITIZATION_POLICY_REGISTRY_KEY];
};

/** Registers a named policy without allowing later registrations to widen it. */
export const registerLogSanitizationPolicy = (
  policy: LogSanitizationPolicy,
) => {
  const registry = getPolicyRegistry();
  const registeredPolicy = registry.get(policy.id);

  if (registeredPolicy) return registeredPolicy;

  const immutablePolicy: LogSanitizationPolicy = Object.freeze({
    ...(Number.isInteger(policy.depth)
      ? {
          depth: Math.min(
            Math.max(policy.depth ?? 0, 0),
            MAX_LOG_SANITIZATION_POLICY_DEPTH,
          ),
        }
      : {}),
    id: policy.id,
    hashPaths: Object.freeze(
      (policy.hashPaths ?? []).map((path) => Object.freeze([...path])),
    ),
    metadataPaths: Object.freeze(
      policy.metadataPaths.map((path) => Object.freeze([...path])),
    ),
  });

  registry.set(immutablePolicy.id, immutablePolicy);
  return immutablePolicy;
};

export const getLogSanitizationPolicy = (policyId: string) =>
  getPolicyRegistry().get(policyId);

/** Applies a registered policy to all parameters of one logger call. */
export const logParamsWithSanitizationPolicy = (
  policyId: string,
  params: readonly unknown[],
): LogParamsWithSanitizationPolicy => ({
  [LOG_SANITIZATION_POLICY_PARAMS_MARK]: true,
  params,
  policyId,
});

export const isLogParamsWithSanitizationPolicy = (
  value: unknown,
): value is LogParamsWithSanitizationPolicy =>
  value !== null &&
  typeof value === 'object' &&
  LOG_SANITIZATION_POLICY_PARAMS_MARK in value;

export const createSerializedLogSanitizationPolicyMarker = (
  policyId: string,
): SerializedLogSanitizationPolicyMarker => ({
  [SERIALIZED_LOG_SANITIZATION_POLICY_KEY]: {
    id: policyId,
    version: LOG_SANITIZATION_POLICY_VERSION,
  },
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

export const getSerializedLogSanitizationPolicyId = (value: unknown) => {
  if (!isRecord(value) || Object.keys(value).length !== 1) return undefined;

  const marker = value[SERIALIZED_LOG_SANITIZATION_POLICY_KEY];

  if (
    !isRecord(marker) ||
    Object.keys(marker).length !== 2 ||
    typeof marker.id !== 'string' ||
    marker.version !== LOG_SANITIZATION_POLICY_VERSION
  ) {
    return undefined;
  }

  return marker.id;
};
