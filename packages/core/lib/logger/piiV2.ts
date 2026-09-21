import { hmac } from '@noble/hashes/hmac';
import { sha256 } from '@noble/hashes/sha2';

export const PII_MARKER_VERSION = 2;
export const SECRET_MARKER_V2 = '[Secret:v2]';
export const BINARY_MARKER_V2 = '[Binary:v2]';
export const UNAVAILABLE_MARKER_V2 = '[Unavailable:v2]';

export const PII_DEVICE_KEY_STORAGE_KEY = 'RC_MFE_PII_DEVICE_KEY';

const BASE32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const REF_BYTES = 8;
const REF_LENGTH = 13;
const TEXT_ENCODER = new TextEncoder();
const NUL_CHARACTER = String.fromCharCode(0);

const TYPE_PATTERN = /^[a-z0-9-]+$/;
const REF_PATTERN = /^[A-Z2-7]{13}$/;
const MARKER_CANDIDATE_REGEX =
  /\[(?:PII:v2;[a-z0-9-]+;[^;\]]*;[A-Z2-7]{13}|Secret:v2|Binary:v2|Restricted:v2;[a-z0-9-]+)\]/g;

export type CorrelatablePiiType =
  | 'user-id'
  | 'phone'
  | 'email'
  | 'username'
  | 'person-name'
  | 'ipv4'
  | 'ipv6'
  | 'mac'
  | 'access-token'
  | 'refresh-token'
  | 'authorization-code'
  | 'jwt';

export type RestrictedPiiType = 'address' | 'ssn' | 'credit-card';

export type PiiDeviceKeySource = 'persistent' | 'ephemeral';

let cachedDeviceKey: Uint8Array | undefined;
let cachedDeviceKeySource: PiiDeviceKeySource | undefined;
let ephemeralDeviceKey: Uint8Array | undefined;

const bytesToBase32 = (bytes: Uint8Array): string => {
  let bits = 0;
  let value = 0;
  let output = '';

  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      output += BASE32[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += BASE32[(value << (5 - bits)) & 31];
  }

  return output;
};

const encodeUtf8 = (value: string): Uint8Array => TEXT_ENCODER.encode(value);

export function encodePreview(value: string): string {
  let output = '';

  for (let index = 0; index < value.length; ) {
    const codePoint = value.codePointAt(index)!;
    const char = String.fromCodePoint(codePoint);
    const codeUnits = codePoint > 0xffff ? 2 : 1;

    if (
      codePoint < 0x20 ||
      codePoint === 0x7f ||
      codePoint > 0x7e ||
      char === '%' ||
      char === ';' ||
      char === '[' ||
      char === ']'
    ) {
      const bytes = encodeUtf8(char);
      for (const byte of bytes) {
        output += `%${byte.toString(16).toUpperCase().padStart(2, '0')}`;
      }
    } else {
      output += char;
    }

    index += codeUnits;
  }

  return output;
}

export function decodePreview(value: string): string | undefined {
  if (value === '-') {
    return value;
  }

  const bytes: number[] = [];
  for (let index = 0; index < value.length; ) {
    const char = value[index];
    if (char !== '%') {
      const code = char.charCodeAt(0);
      if (
        char === ';' ||
        char === '[' ||
        char === ']' ||
        code < 0x20 ||
        code > 0x7e
      ) {
        return undefined;
      }
      bytes.push(code);
      index += 1;
      continue;
    }

    const hex = value.slice(index + 1, index + 3);
    if (!/^[0-9A-Fa-f]{2}$/.test(hex)) {
      return undefined;
    }
    bytes.push(parseInt(hex, 16));
    index += 3;
  }

  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(
      Uint8Array.from(bytes),
    );
  } catch {
    return undefined;
  }
}

export function createPiiDeviceKeyBytes(): Uint8Array {
  const bytes = new Uint8Array(32);
  if (globalThis.crypto?.getRandomValues) {
    globalThis.crypto.getRandomValues(bytes);
    return bytes;
  }

  // ponytail: Math.random fallback only when Web Crypto missing (tests / odd hosts)
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = Math.floor(Math.random() * 256);
  }
  return bytes;
}

const bytesToHex = (bytes: Uint8Array) =>
  Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');

const hexToBytes = (hex: string): Uint8Array | undefined => {
  if (!/^[0-9a-fA-F]+$/.test(hex) || hex.length % 2 !== 0) {
    return undefined;
  }
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
};

export function resetPiiDeviceKeyForTests() {
  cachedDeviceKey = undefined;
  cachedDeviceKeySource = undefined;
  ephemeralDeviceKey = undefined;
}

/** Install the installation key (window → SharedWorker sync, tests). */
export function setPiiDeviceKey(key: Uint8Array) {
  if (key.length !== 32) {
    return;
  }
  cachedDeviceKey = key;
  cachedDeviceKeySource = 'persistent';
  ephemeralDeviceKey = undefined;
}

export function setPiiDeviceKeyForTests(key: Uint8Array) {
  setPiiDeviceKey(key);
}

export function setPiiDeviceKeyFromHex(hex: string): boolean {
  const bytes = hexToBytes(hex);
  if (!bytes || bytes.length !== 32) {
    return false;
  }
  setPiiDeviceKey(bytes);
  return true;
}

/** Hex form for same-origin SharedWorker transport. Never log this value. */
export function getPiiDeviceKeyHex(): string {
  return bytesToHex(ensurePiiDeviceKey().key);
}

export function getPiiDeviceKeySource(): PiiDeviceKeySource | undefined {
  return cachedDeviceKeySource;
}

export function ensurePiiDeviceKey(options?: {
  storage?: Pick<Storage, 'getItem' | 'setItem'> | null;
  key?: Uint8Array;
}): { key: Uint8Array; source: PiiDeviceKeySource } {
  if (options?.key) {
    setPiiDeviceKey(options.key);
    return { key: options.key, source: 'persistent' };
  }

  if (cachedDeviceKey && cachedDeviceKeySource) {
    return { key: cachedDeviceKey, source: cachedDeviceKeySource };
  }

  try {
    const storage =
      options?.storage === undefined
        ? globalThis.localStorage ?? null
        : options.storage;

    if (storage) {
      const existing = storage.getItem(PII_DEVICE_KEY_STORAGE_KEY);
      const parsed = existing ? hexToBytes(existing) : undefined;
      if (parsed && parsed.length === 32) {
        setPiiDeviceKey(parsed);
        return { key: parsed, source: 'persistent' };
      }

      const created = createPiiDeviceKeyBytes();
      storage.setItem(PII_DEVICE_KEY_STORAGE_KEY, bytesToHex(created));
      setPiiDeviceKey(created);
      return { key: created, source: 'persistent' };
    }
  } catch {
    // fall through to ephemeral
  }

  if (!ephemeralDeviceKey) {
    ephemeralDeviceKey = createPiiDeviceKeyBytes();
  }
  cachedDeviceKey = ephemeralDeviceKey;
  cachedDeviceKeySource = 'ephemeral';
  return { key: ephemeralDeviceKey, source: 'ephemeral' };
}

export function buildPiiReference(
  type: string,
  exactLoggedValue: string,
  deviceKey: Uint8Array,
): string {
  const payload = encodeUtf8(`${type}${NUL_CHARACTER}${exactLoggedValue}`);
  const digest = hmac(sha256, deviceKey, payload);
  return bytesToBase32(digest.subarray(0, REF_BYTES)).slice(0, REF_LENGTH);
}

export function restrictedMarker(type: RestrictedPiiType): string {
  return `[Restricted:v2;${type}]`;
}

export function correlatableMarker(
  type: CorrelatablePiiType,
  preview: string,
  exactLoggedValue: string,
  deviceKey: Uint8Array,
): string {
  const encodedPreview = preview === '-' ? '-' : encodePreview(preview);
  const ref = buildPiiReference(type, exactLoggedValue, deviceKey);
  return `[PII:v2;${type};${encodedPreview};${ref}]`;
}

const isCanonicalPreview = (preview: string) => {
  if (preview === '-') {
    return true;
  }
  const decoded = decodePreview(preview);
  if (decoded === undefined) {
    return false;
  }
  return encodePreview(decoded) === preview;
};

const isValidClassPreview = (type: string, encodedPreview: string) => {
  if (!isCanonicalPreview(encodedPreview)) {
    return false;
  }

  const preview = encodedPreview === '-' ? '-' : decodePreview(encodedPreview);
  if (preview === undefined) {
    return false;
  }

  switch (type) {
    case 'ipv4':
    case 'ipv6':
    case 'mac':
      return preview === '-';
    case 'email':
      return (
        preview === '-' || (preview.includes('@') && preview.includes('*'))
      );
    case 'phone':
      return preview === '-' || (preview.includes('*') && /\d/.test(preview));
    case 'person-name':
      return preview === '-' || /^[A-Z]\.(?: [A-Z]\.)*$/.test(preview);
    case 'username':
    case 'user-id':
      return preview === '-' || preview.includes('*');
    case 'access-token':
    case 'refresh-token':
    case 'authorization-code':
    case 'jwt':
      return preview === '-' || preview.includes('*');
    default:
      return false;
  }
};

export function isCanonicalPiiMarker(value: string): boolean {
  if (value === SECRET_MARKER_V2 || value === BINARY_MARKER_V2) {
    return true;
  }

  const restricted = /^\[Restricted:v2;([a-z0-9-]+)\]$/.exec(value);
  if (restricted) {
    return TYPE_PATTERN.test(restricted[1]);
  }

  const correlatable = /^\[PII:v2;([a-z0-9-]+);([^;]*);([A-Z2-7]{13})\]$/.exec(
    value,
  );
  if (!correlatable) {
    return false;
  }

  const [, type, preview, ref] = correlatable;
  return (
    TYPE_PATTERN.test(type) &&
    REF_PATTERN.test(ref) &&
    isValidClassPreview(type, preview)
  );
}

/** Windows-safe archive path marker: letters, digits, `_` only inside token. */
const FILENAME_SAFE_MARKER_REGEX = /__PII_V2_[A-Z0-9_]+__/g;

const toFilenameType = (type: string) => type.toUpperCase().replace(/-/g, '_');

/**
 * Convert a canonical content marker into `__PII_V2_<TYPE>[_<REF>]__`.
 * Content markers (`:`, `*`, brackets) are illegal in Windows filenames.
 */
export function toFilenameSafePiiMarker(marker: string): string | undefined {
  if (marker === SECRET_MARKER_V2) {
    return '__PII_V2_SECRET__';
  }
  if (marker === BINARY_MARKER_V2) {
    return '__PII_V2_BINARY__';
  }

  const restricted = /^\[Restricted:v2;([a-z0-9-]+)\]$/.exec(marker);
  if (restricted && TYPE_PATTERN.test(restricted[1])) {
    return `__PII_V2_${toFilenameType(restricted[1])}__`;
  }

  const correlatable = /^\[PII:v2;([a-z0-9-]+);([^;]*);([A-Z2-7]{13})\]$/.exec(
    marker,
  );
  if (
    correlatable &&
    TYPE_PATTERN.test(correlatable[1]) &&
    REF_PATTERN.test(correlatable[3]) &&
    isValidClassPreview(correlatable[1], correlatable[2])
  ) {
    return `__PII_V2_${toFilenameType(correlatable[1])}_${correlatable[3]}__`;
  }

  return undefined;
}

export function isCanonicalFilenameSafePiiMarker(value: string): boolean {
  if (value === '__PII_V2_SECRET__') {
    return true;
  }

  const withRef = /^__PII_V2_([A-Z0-9_]+)_([A-Z2-7]{13})__$/.exec(value);
  if (withRef) {
    return REF_PATTERN.test(withRef[2]);
  }

  const typeOnly = /^__PII_V2_([A-Z0-9_]+)__$/.exec(value);
  return Boolean(typeOnly && typeOnly[1].length > 0);
}

/** Replace canonical content markers with filename-safe path markers. */
export function replaceContentMarkersWithFilenameSafe(value: string): string {
  return value.replace(MARKER_CANDIDATE_REGEX, (candidate) => {
    if (!isCanonicalPiiMarker(candidate)) {
      return candidate;
    }
    return toFilenameSafePiiMarker(candidate) ?? candidate;
  });
}

/** Idempotent: leave existing filename-safe markers untouched. */
export function preserveFilenameSafeMarkers(
  value: string,
  transform: (unprotected: string) => string,
): string {
  const slots: string[] = [];
  const protectedValue = value.replace(
    FILENAME_SAFE_MARKER_REGEX,
    (candidate) => {
      if (!isCanonicalFilenameSafePiiMarker(candidate)) {
        return candidate;
      }
      const index = slots.length;
      slots.push(candidate);
      return `${NUL_CHARACTER}FN${index}${NUL_CHARACTER}`;
    },
  );
  const transformed = transform(protectedValue);
  const slotPattern = new RegExp(
    `${NUL_CHARACTER}FN(\\d+)${NUL_CHARACTER}`,
    'g',
  );
  return transformed.replace(slotPattern, (_match, index) => {
    return slots[Number(index)] ?? _match;
  });
}

// Nested preserveCanonicalMarkers calls must not share `\0PIIn\0` slots —
// an inner restore would overwrite outer placeholders (e.g. URL path markers
// becoming `[Secret:v2]` after a nested maskQuery/userinfo pass).
let preserveCanonicalMarkerCallId = 0;

export function preserveCanonicalMarkers(
  value: string,
  transform: (unprotected: string) => string,
): string {
  const callId = (preserveCanonicalMarkerCallId += 1);
  const slots: string[] = [];
  const protectedValue = value.replace(MARKER_CANDIDATE_REGEX, (candidate) => {
    if (!isCanonicalPiiMarker(candidate)) {
      return candidate;
    }
    const index = slots.length;
    slots.push(candidate);
    return `${NUL_CHARACTER}PII${callId}.${index}${NUL_CHARACTER}`;
  });

  const transformed = transform(protectedValue);
  const slotPattern = new RegExp(
    `${NUL_CHARACTER}PII${callId}\\.(\\d+)${NUL_CHARACTER}`,
    'g',
  );
  return transformed.replace(slotPattern, (_match, index) => {
    return slots[Number(index)] ?? _match;
  });
}

export function previewUserId(value: string): string {
  const length = value.length;
  if (length < 6) {
    return '-';
  }
  if (length <= 7) {
    return `${value[0]}***${value[length - 1]}`;
  }
  return `${value.slice(0, 3)}***${value.slice(-3)}`;
}

export function previewUsername(value: string): string {
  if (value.length < 6) {
    return '-';
  }
  return `${value.slice(0, 2)}***${value.slice(-2)}`;
}

export function previewEmail(value: string): string {
  const at = value.indexOf('@');
  if (at <= 0 || at === value.length - 1) {
    return '-';
  }

  let output = '';
  for (let i = 0; i < value.length; i += 1) {
    const char = value[i];
    if (char === '@' || char === '.') {
      output += char;
      continue;
    }
    if (i < 2 || i >= value.length - 2) {
      output += char;
    } else {
      output += '*';
    }
  }
  return output;
}

const isAsciiDigit = (character: string) =>
  character >= '0' && character <= '9';

const splitPhoneExtension = (value: string) => {
  const trimmed = value.trimEnd();
  let digitStart = trimmed.length;

  while (digitStart > 0 && isAsciiDigit(trimmed[digitStart - 1])) {
    digitStart -= 1;
  }

  if (digitStart === trimmed.length) {
    return { main: value, extension: undefined };
  }

  let markerEnd = digitStart;
  while (markerEnd > 0 && /\s/.test(trimmed[markerEnd - 1])) {
    markerEnd -= 1;
  }

  const lowerValue = trimmed.toLowerCase();
  const marker = ['extension', 'ext.', 'ext', 'x'].find((candidate) =>
    lowerValue.endsWith(candidate, markerEnd),
  );
  if (!marker) {
    return { main: value, extension: undefined };
  }

  let extensionStart = markerEnd - marker.length;
  while (extensionStart > 0 && /\s/.test(value[extensionStart - 1])) {
    extensionStart -= 1;
  }

  return {
    main: value.slice(0, extensionStart),
    extension: trimmed.slice(digitStart),
  };
};

export function previewPhone(value: string): string {
  const { main, extension } = splitPhoneExtension(value);

  let digitIndex = 0;
  const digits = main.replace(/\D/g, '');
  if (digits.length <= 4) {
    return '-';
  }

  let maskedMain = '';
  for (const char of main) {
    if (/\d/.test(char)) {
      if (digitIndex < 2 || digitIndex >= digits.length - 2) {
        maskedMain += char;
      } else {
        maskedMain += '*';
      }
      digitIndex += 1;
    } else {
      maskedMain += char;
    }
  }

  if (!extension) {
    return maskedMain;
  }

  if (extension.length === 1) {
    return `${maskedMain} ext *`;
  }
  return `${maskedMain} ext ${extension[0]}*${extension[extension.length - 1]}`;
}

export function previewPersonName(value: string): string {
  const parts = value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .filter((char) => /[A-Za-z]/.test(char));

  if (parts.length === 0) {
    return '-';
  }

  return parts.map((char) => `${char.toUpperCase()}.`).join(' ');
}

export function previewToken(value: string): string {
  if (value.length < 16) {
    return '-';
  }

  const isJwt = value.split('.').length === 3;
  if (isJwt) {
    return value
      .split('.')
      .map((segment) => {
        if (segment.length < 16) {
          return '*'.repeat(Math.min(segment.length, 8)) || '-';
        }
        if (segment.length < 32) {
          return `${segment.slice(0, 4)}***${segment.slice(-4)}`;
        }
        return `${segment.slice(0, 5)}***${segment.slice(-5)}`;
      })
      .join('.');
  }

  if (value.length < 32) {
    return `${value.slice(0, 4)}***${value.slice(-4)}`;
  }
  return `${value.slice(0, 5)}***${value.slice(-5)}`;
}

export function redactUserId(value: string, deviceKey: Uint8Array): string {
  return correlatableMarker('user-id', previewUserId(value), value, deviceKey);
}

export function redactEmail(value: string, deviceKey: Uint8Array): string {
  return correlatableMarker('email', previewEmail(value), value, deviceKey);
}

export function redactPhone(value: string, deviceKey: Uint8Array): string {
  if (value.replace(/\D/g, '').length <= 4) {
    return SECRET_MARKER_V2;
  }
  return correlatableMarker('phone', previewPhone(value), value, deviceKey);
}

export function redactUsername(value: string, deviceKey: Uint8Array): string {
  return correlatableMarker(
    'username',
    previewUsername(value),
    value,
    deviceKey,
  );
}

const hasNonAsciiChar = (value: string) => {
  for (let index = 0; index < value.length; index += 1) {
    if (value.charCodeAt(index) > 0x7f) {
      return true;
    }
  }
  return false;
};

export function redactPersonName(value: string, deviceKey: Uint8Array): string {
  // Decision 34: non-ASCII names prefer reference-only over escaped initials
  const preview = hasNonAsciiChar(value) ? '-' : previewPersonName(value);
  return correlatableMarker('person-name', preview, value, deviceKey);
}

export function redactIpv4(value: string, deviceKey: Uint8Array): string {
  return correlatableMarker('ipv4', '-', value, deviceKey);
}

export function redactIpv6(value: string, deviceKey: Uint8Array): string {
  return correlatableMarker('ipv6', '-', value, deviceKey);
}

export function redactMac(value: string, deviceKey: Uint8Array): string {
  return correlatableMarker('mac', '-', value, deviceKey);
}

export function redactAccessToken(
  value: string,
  deviceKey: Uint8Array,
  type: Extract<
    CorrelatablePiiType,
    'access-token' | 'refresh-token' | 'authorization-code' | 'jwt'
  > = 'access-token',
): string {
  if (isCanonicalPiiMarker(value)) {
    return value;
  }
  return correlatableMarker(type, previewToken(value), value, deviceKey);
}

export function redactSecret(): string {
  return SECRET_MARKER_V2;
}

export function redactRestricted(type: RestrictedPiiType): string {
  return restrictedMarker(type);
}
