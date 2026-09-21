import * as sanitizerConstants from './piiSanitizer.constants';
import type {
  SanitizeContext,
  SanitizeLogOptions,
} from './piiSanitizer.interface';
import { ensurePiiDeviceKey } from './piiV2';

const {
  DEFAULT_LOG_HASH_SALT,
  EMPTY_WORDS,
  DEFAULT_SANITIZE_OPTIONS,
  DEFAULT_DEPTH,
  MAX_SANITIZE_NODES,
  createKeySet,
  defaultSensitiveKeys,
  defaultMaskKeys,
} = sanitizerConstants;

const createSensitiveKeys = (
  excludes: string[],
  options: SanitizeLogOptions,
) => {
  const hasCustomSensitiveKeys =
    excludes.length > 0 ||
    (options.excludes?.length ?? 0) > 0 ||
    (options.sensitiveWords?.length ?? 0) > 0;

  if (!hasCustomSensitiveKeys) {
    return defaultSensitiveKeys;
  }

  return createKeySet([
    ...Array.from(defaultSensitiveKeys),
    ...excludes,
    ...(options.excludes ?? []),
    ...(options.sensitiveWords ?? []),
  ]);
};

const createMaskKeys = (options: SanitizeLogOptions) => {
  if ((options.maskWords?.length ?? 0) === 0) {
    return defaultMaskKeys;
  }

  return createKeySet([
    ...Array.from(defaultMaskKeys),
    ...(options.maskWords ?? []),
  ]);
};

const createCustomSensitiveKeys = (
  excludes: string[],
  options: SanitizeLogOptions,
) =>
  createKeySet([
    ...excludes,
    ...(options.excludes ?? []),
    ...(options.sensitiveWords ?? []),
  ]);

export const createContext = (
  excludes: string[] = EMPTY_WORDS,
  options: SanitizeLogOptions = DEFAULT_SANITIZE_OPTIONS,
): SanitizeContext => ({
  depth: options.depth ?? DEFAULT_DEPTH,
  sensitiveKeys: createSensitiveKeys(excludes, options),
  customSensitiveKeys: createCustomSensitiveKeys(excludes, options),
  maskKeys: createMaskKeys(options),
  hashSalt: options.hashSalt ?? DEFAULT_LOG_HASH_SALT,
  deviceKey: options.deviceKey ?? ensurePiiDeviceKey().key,
  seen: new WeakSet(),
  budget: { nodes: MAX_SANITIZE_NODES },
});

export const createRootContext = (
  context: SanitizeContext,
): SanitizeContext => ({
  ...context,
  seen: new WeakSet(),
});
