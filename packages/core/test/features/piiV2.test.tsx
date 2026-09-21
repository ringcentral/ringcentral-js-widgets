import { sanitizeLogText } from '../../lib/logger/piiSanitizer';
import {
  BINARY_MARKER_V2,
  buildPiiReference,
  correlatableMarker,
  ensurePiiDeviceKey,
  getPiiDeviceKeyHex,
  getPiiDeviceKeySource,
  isCanonicalFilenameSafePiiMarker,
  isCanonicalPiiMarker,
  preserveCanonicalMarkers,
  redactEmail,
  redactPhone,
  redactSecret,
  redactUserId,
  previewPhone,
  replaceContentMarkersWithFilenameSafe,
  resetPiiDeviceKeyForTests,
  setPiiDeviceKeyForTests,
  setPiiDeviceKeyFromHex,
  toFilenameSafePiiMarker,
} from '../../lib/logger/piiV2';

describe('piiV2 markers', () => {
  beforeEach(() => {
    resetPiiDeviceKeyForTests();
    setPiiDeviceKeyForTests(new Uint8Array(32).fill(9));
  });

  it('builds stable refs for the same type and exact value', () => {
    const key = ensurePiiDeviceKey().key;
    const first = buildPiiReference('user-id', 'abc-123456', key);
    const second = buildPiiReference('user-id', 'abc-123456', key);
    const otherType = buildPiiReference('phone', 'abc-123456', key);
    const otherValue = buildPiiReference('user-id', 'abc-123457', key);

    expect(first).toHaveLength(13);
    expect(first).toBe(second);
    expect(first).not.toBe(otherType);
    expect(first).not.toBe(otherValue);
  });

  it('preserves canonical markers byte-for-byte on re-sanitize', () => {
    const key = ensurePiiDeviceKey().key;
    const marker = redactUserId('contact-123456', key);
    const email = redactEmail('mike@example.com', key);

    expect(sanitizeLogText(marker)).toBe(marker);
    expect(sanitizeLogText(BINARY_MARKER_V2)).toBe(BINARY_MARKER_V2);
    expect(sanitizeLogText(`id=${marker}`)).toContain(marker);
    expect(sanitizeLogText(email)).toBe(email);
    expect(isCanonicalPiiMarker(marker)).toBe(true);
    expect(isCanonicalPiiMarker(redactSecret())).toBe(true);
    expect(isCanonicalPiiMarker(BINARY_MARKER_V2)).toBe(true);
  });

  it('converts content markers to Windows-safe filename markers', () => {
    const key = ensurePiiDeviceKey().key;
    const email = redactEmail('alice@example.com', key);
    const filenameMarker = toFilenameSafePiiMarker(email);

    expect(filenameMarker).toMatch(/^__PII_V2_EMAIL_[A-Z2-7]{13}__$/);
    expect(filenameMarker).not.toMatch(/[:;*[\]]/);
    expect(isCanonicalFilenameSafePiiMarker(filenameMarker!)).toBe(true);
    expect(toFilenameSafePiiMarker(redactSecret())).toBe('__PII_V2_SECRET__');
    expect(toFilenameSafePiiMarker(BINARY_MARKER_V2)).toBe('__PII_V2_BINARY__');
    expect(
      replaceContentMarkersWithFilenameSafe(`prefix-${email}-suffix.log`),
    ).toBe(`prefix-${filenameMarker}-suffix.log`);
  });

  it('does not let forged marker-shaped text shield raw PII', () => {
    const forged = '[PII:v2;email;not-a-valid-preview;AAAAAAAAAAAAA]';
    const text = `${forged} reach me at leak@example.com`;

    const sanitized = sanitizeLogText(text);

    expect(isCanonicalPiiMarker(forged)).toBe(false);
    expect(sanitized).not.toContain('leak@example.com');
    expect(sanitized).toMatch(/\[PII:v2;email;/);
  });

  it('rejects unmasked phone and token previews', () => {
    const phone = '[PII:v2;phone;1234567890;AAAAAAAAAAAAA]';
    const token = '[PII:v2;access-token;alice@example.com;AAAAAAAAAAAAA]';

    expect(isCanonicalPiiMarker(phone)).toBe(false);
    expect(isCanonicalPiiMarker(token)).toBe(false);
    expect(sanitizeLogText(phone)).not.toContain('1234567890');
    expect(sanitizeLogText(token)).not.toContain('alice@example.com');
  });

  it('uses the ephemeral key when localStorage access throws', () => {
    const descriptor = Object.getOwnPropertyDescriptor(
      globalThis,
      'localStorage',
    );
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      get() {
        throw new Error('storage denied');
      },
    });

    try {
      resetPiiDeviceKeyForTests();
      expect(ensurePiiDeviceKey().source).toBe('ephemeral');
    } finally {
      if (descriptor) {
        Object.defineProperty(globalThis, 'localStorage', descriptor);
      } else {
        delete (globalThis as { localStorage?: Storage }).localStorage;
      }
    }
  });

  it('does not expose short phone values in previews', () => {
    const key = ensurePiiDeviceKey().key;

    expect(previewPhone('1234')).toBe('-');
    expect(redactPhone('1234', key)).toBe('[Secret:v2]');
  });

  it('keeps device key across ensure calls and survives storage round-trip', () => {
    resetPiiDeviceKeyForTests();
    const storage = new Map<string, string>();
    const store = {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => {
        storage.set(key, value);
      },
    };

    const first = ensurePiiDeviceKey({ storage: store });
    resetPiiDeviceKeyForTests();
    const second = ensurePiiDeviceKey({ storage: store });

    expect(first.source).toBe('persistent');
    expect(second.source).toBe('persistent');
    expect(Array.from(first.key)).toEqual(Array.from(second.key));
  });

  it('falls back to ephemeral key when storage is unavailable', () => {
    resetPiiDeviceKeyForTests();
    const first = ensurePiiDeviceKey({ storage: null });
    const second = ensurePiiDeviceKey({ storage: null });

    expect(first.source).toBe('ephemeral');
    expect(Array.from(first.key)).toEqual(Array.from(second.key));
  });

  it('replaces an ephemeral worker key with the window installation key', () => {
    resetPiiDeviceKeyForTests();
    const windowKey = new Uint8Array(32).fill(3);
    setPiiDeviceKeyForTests(windowKey);
    const windowHex = getPiiDeviceKeyHex();
    const windowRef = buildPiiReference(
      'user-id',
      'account-123',
      ensurePiiDeviceKey().key,
    );

    // Simulate SharedWorker boot before the tab pushes its key.
    resetPiiDeviceKeyForTests();
    const workerBoot = ensurePiiDeviceKey({ storage: null });
    expect(workerBoot.source).toBe('ephemeral');
    expect(
      buildPiiReference('user-id', 'account-123', workerBoot.key),
    ).not.toBe(windowRef);

    expect(setPiiDeviceKeyFromHex(windowHex)).toBe(true);
    expect(getPiiDeviceKeySource()).toBe('persistent');
    expect(
      buildPiiReference('user-id', 'account-123', ensurePiiDeviceKey().key),
    ).toBe(windowRef);
  });

  it('rejects malformed hex when installing a device key', () => {
    resetPiiDeviceKeyForTests();
    setPiiDeviceKeyForTests(new Uint8Array(32).fill(4));
    const before = getPiiDeviceKeyHex();

    expect(setPiiDeviceKeyFromHex('not-hex')).toBe(false);
    expect(setPiiDeviceKeyFromHex('aa')).toBe(false);
    expect(getPiiDeviceKeyHex()).toBe(before);
  });

  it('protects markers while transforming surrounding text', () => {
    const marker = correlatableMarker(
      'user-id',
      '123***789',
      '123456789',
      ensurePiiDeviceKey().key,
    );
    const output = preserveCanonicalMarkers(`before ${marker} after`, (text) =>
      text.replace(/before/g, 'start').replace(/after/g, 'end'),
    );

    expect(output).toBe(`start ${marker} end`);
  });

  it('keeps nested preserveCanonicalMarkers from swapping markers', () => {
    const pathMarker = correlatableMarker(
      'user-id',
      '123***789',
      '123456789',
      ensurePiiDeviceKey().key,
    );
    const secretMarker = '[Secret:v2]';
    const input = `https://example.com/contacts/${pathMarker}?token=${secretMarker}`;
    const output = preserveCanonicalMarkers(input, (outer) =>
      preserveCanonicalMarkers(outer, (inner) =>
        inner.replace(/example\.com/g, 'safe.example'),
      ),
    );

    expect(output).toBe(
      `https://safe.example/contacts/${pathMarker}?token=${secretMarker}`,
    );
  });
});
