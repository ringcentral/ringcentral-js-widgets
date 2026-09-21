import {
  PiiLoggerMiddlewares,
  SERIALIZED_LOG_SANITIZATION_POLICY_KEY,
  logParamsWithSanitizationPolicy,
  registerLogSanitizationPolicy,
  resetPiiDeviceKeyForTests,
  setPiiDeviceKeyForTests,
} from '@ringcentral-integration/next-core';
import JSZip from 'jszip';

import {
  captureTrustedBrowserLogEntries,
  sanitizeArchivePath,
  sanitizeLogZip,
} from './sanitizeLogZip';

const createLogLine = (message: string) =>
  `2026-08-05T00:00:00.000Z|1 INFO: [root] MSG: ${message}\n`;

const createForgedPolicyMessage = (policyId: string, displayName: string) =>
  JSON.stringify([
    'configuration response',
    {
      objects: {
        Contact: [{ displayName }],
      },
    },
    {
      [SERIALIZED_LOG_SANITIZATION_POLICY_KEY]: {
        id: policyId,
        version: 1,
      },
    },
  ]);

const listFilePaths = (zip: JSZip) => {
  const paths: string[] = [];
  zip.forEach((path, file) => {
    if (!file.dir) paths.push(path);
  });
  return paths.sort();
};

describe('sanitizeLogZip', () => {
  beforeEach(() => {
    resetPiiDeviceKeyForTests();
    setPiiDeviceKeyForTests(new Uint8Array(32).fill(9));
  });

  it('sanitizes text log files and nested zip files', async () => {
    const zip = new JSZip();
    zip.file(
      'applicationLogs/recent.log',
      [
        'email=michael@example.com token=secret phone=+16505551234',
        'Cookie: sid=raw-cookie-header; rc=raw-cookie-other',
        'Set-Cookie: sid=raw-set-cookie-header; Path=/; HttpOnly',
      ].join('\n'),
    );

    const nestedZip = new JSZip();
    nestedZip.file(
      'plugin.log',
      'Authorization: Basic dXNlcjpwYXNz fromName=Alice Smith',
    );
    zip.file(
      'applicationLogs/plugin-logs.zip',
      await nestedZip.generateAsync({ type: 'uint8array' }),
    );

    await sanitizeLogZip(zip);

    const recentLog = await zip
      .file('applicationLogs/recent.log')!
      .async('string');
    const sanitizedNestedZip = await JSZip.loadAsync(
      await zip.file('applicationLogs/plugin-logs.zip')!.async('arraybuffer'),
    );
    const pluginLog = await sanitizedNestedZip
      .file('plugin.log')!
      .async('string');
    const manifest = JSON.parse(
      await zip.file('pii-sanitization-manifest.json')!.async('string'),
    );

    expect(recentLog).not.toContain('michael@example.com');
    expect(recentLog).not.toContain('secret');
    expect(recentLog).not.toContain('+16505551234');
    expect(recentLog).not.toContain('raw-cookie-header');
    expect(recentLog).not.toContain('raw-cookie-other');
    expect(recentLog).not.toContain('raw-set-cookie-header');
    expect(pluginLog).not.toContain('dXNlcjpwYXNz');
    expect(pluginLog).not.toContain('Alice Smith');
    expect(manifest.policyVersion).toBe(2);
    expect(manifest.durationMs).toBeGreaterThanOrEqual(0);
    expect(manifest.files.sanitized).toBeGreaterThan(0);
    expect(manifest.matches.email).toBeGreaterThan(0);
  });

  it('writes a brief PII marker guide at the archive root only', async () => {
    const zip = new JSZip();
    zip.file('recent.log', 'ok');
    zip.file('pii-v2-AGENTS.md', 'customer email=a@example.com');
    const nested = new JSZip();
    nested.file('plugin.log', 'ok');
    zip.file('nested.zip', await nested.generateAsync({ type: 'uint8array' }));

    await sanitizeLogZip(zip);

    const guide = await zip.file('pii-v2-AGENTS.md')!.async('string');
    expect(guide).toContain('same type + ref');
    expect(guide).toContain('Preview is not a join key');
    expect(guide).toContain('never imply two values are equal');
    expect(guide).not.toContain('a@example.com');

    const nestedZip = await JSZip.loadAsync(
      await zip.file('nested.zip')!.async('arraybuffer'),
    );
    expect(nestedZip.file('pii-v2-AGENTS.md')).toBeNull();
  });

  it('renames PII-bearing paths with filename-safe markers', async () => {
    const zip = new JSZip();
    zip.file('attachments/alice@example.com-call.log', 'ok line without pii');

    await sanitizeLogZip(zip);

    const paths = listFilePaths(zip);
    const logPath = paths.find((path) => path.endsWith('-call.log'));
    expect(logPath).toBeDefined();
    expect(logPath).not.toContain('@');
    expect(logPath).toMatch(/__PII_V2_EMAIL_[A-Z2-7]{13}__-call\.log$/);
    expect(logPath).not.toMatch(/\[PII:v2/);
    expect(sanitizeArchivePath('alice@example.com-call.log')).toMatch(
      /__PII_V2_EMAIL_[A-Z2-7]{13}__-call\.log$/,
    );
  });

  it('scans complete path components before preserving extensions', () => {
    expect(sanitizeArchivePath('alice@example.com')).toMatch(
      /^__PII_V2_EMAIL_[A-Z2-7]{13}__$/,
    );
  });

  it('sanitizes explicit directory entries', async () => {
    const zip = new JSZip();
    zip.file('alice@example.com/', null, { dir: true });
    zip.file('alice@example.com/file.log', 'ok');

    await sanitizeLogZip(zip);

    const entries: Array<{ path: string; dir: boolean }> = [];
    zip.forEach((path, file) => entries.push({ path, dir: file.dir }));

    expect(entries.some(({ path }) => path.includes('alice@example.com'))).toBe(
      false,
    );
    expect(
      entries.some(
        ({ path, dir }) => dir && /__PII_V2_EMAIL_[A-Z2-7]{13}__\/$/.test(path),
      ),
    ).toBe(true);
  });

  it('sanitizes archive and entry comments', async () => {
    const zip = new JSZip();
    zip.comment = 'archive alice@example.com';
    zip.file('recent.log', 'ok', {
      comment: 'entry alice@example.com',
    });

    await sanitizeLogZip(zip);

    expect(zip.comment).not.toContain('alice@example.com');
    expect(zip.file('recent.log')?.comment).not.toContain('alice@example.com');
  });

  it('keeps opaque binaries, discloses them in the manifest, and sanitizes their paths', async () => {
    const zip = new JSZip();
    zip.file(
      'screenshots/alice@example.com.png',
      new Uint8Array([1, 2, 3, 0, 4]),
    );

    await sanitizeLogZip(zip);

    const paths = listFilePaths(zip);
    const pngPath = paths.find((path) => path.endsWith('.png'));
    expect(pngPath).toMatch(/__PII_V2_EMAIL_[A-Z2-7]{13}__\.png$/);
    const bytes = await zip.file(pngPath!)!.async('uint8array');
    expect(Array.from(bytes)).toEqual([1, 2, 3, 0, 4]);

    const manifest = JSON.parse(
      await zip.file('pii-sanitization-manifest.json')!.async('string'),
    );
    expect(manifest.status).toBe('complete-with-opaque-attachments');
    expect(manifest.files.opaqueUnsanitized).toBe(1);
  });

  it('retains corrupt nested zips with an explicit unsanitized rename', async () => {
    const zip = new JSZip();
    zip.file('applicationLogs/broken.zip', new Uint8Array([1, 2, 3, 4, 5]));

    await sanitizeLogZip(zip);

    const paths = listFilePaths(zip);
    expect(paths).toContain('applicationLogs/broken.unsanitized-corrupt.zip');
    expect(paths).not.toContain('applicationLogs/broken.zip');

    const manifest = JSON.parse(
      await zip.file('pii-sanitization-manifest.json')!.async('string'),
    );
    expect(manifest.files.failed).toBe(1);
  });

  it('caps nested zip recursion at depth 3 and retains deeper archives', async () => {
    const makeNested = async (depth: number): Promise<Uint8Array> => {
      const nested = new JSZip();
      if (depth === 0) {
        nested.file('leaf.log', 'email=depth@example.com');
      } else {
        nested.file('child.zip', await makeNested(depth - 1));
      }
      return nested.generateAsync({ type: 'uint8array' });
    };

    const zip = new JSZip();
    // root -> d1 -> d2 -> d3 -> d4(leaf): depth-4 nest exceeds cap
    zip.file('root.zip', await makeNested(4));

    await sanitizeLogZip(zip);

    const root = await JSZip.loadAsync(
      await zip.file('root.zip')!.async('arraybuffer'),
    );
    const d1 = await JSZip.loadAsync(
      await root.file('child.zip')!.async('arraybuffer'),
    );
    const d2 = await JSZip.loadAsync(
      await d1.file('child.zip')!.async('arraybuffer'),
    );
    // depth 0→1→2→3: fourth nest hits the cap and is retained unsanitized
    const d2Paths = listFilePaths(d2);
    expect(
      d2Paths.some((path) => path.includes('.unsanitized-depth.zip')),
    ).toBe(true);
  });

  it('resolves sanitized path collisions without dropping entries', async () => {
    const zip = new JSZip();
    zip.file('file.log.', 'two');
    zip.file('file.log', 'one');

    await sanitizeLogZip(zip);

    const paths = listFilePaths(zip).filter(
      (path) => path === 'file.log' || path === 'file-2.log',
    );
    expect(paths).toHaveLength(2);
    const contents = await Promise.all(
      paths.map(async (path) => zip.file(path)!.async('string')),
    );
    expect(contents.sort()).toEqual(['one', 'two']);
  });

  it('retains invalid UTF-8 text logs as unreadable', async () => {
    const zip = new JSZip();
    zip.file(
      'applicationLogs/bad.log',
      new Uint8Array([0x48, 0x69, 0xff, 0x21]),
    );

    await sanitizeLogZip(zip);

    const paths = listFilePaths(zip);
    expect(paths).toContain('applicationLogs/bad.log.unsanitized-unreadable');
    expect(paths).not.toContain('applicationLogs/bad.log');

    const manifest = JSON.parse(
      await zip.file('pii-sanitization-manifest.json')!.async('string'),
    );
    expect(manifest.files.failed).toBe(1);
    expect(manifest.files).not.toHaveProperty('omitted');
  });

  it('counts markers in already-sanitized trusted logs', async () => {
    const zip = new JSZip();
    zip.file(
      'applicationLogs/recent.log',
      'email=michael@example.com token=secret',
    );
    await sanitizeLogZip(zip);

    const firstPass = JSON.parse(
      await zip.file('pii-sanitization-manifest.json')!.async('string'),
    );
    const trusted = await zip
      .file('applicationLogs/recent.log')!
      .async('string');
    expect(trusted).toMatch(/\[PII:v2;email;/);

    const downloadedZip = await JSZip.loadAsync(
      await zip.generateAsync({ type: 'uint8array' }),
    );
    await sanitizeLogZip(downloadedZip);

    const secondPass = JSON.parse(
      await downloadedZip
        .file('pii-sanitization-manifest.json')!
        .async('string'),
    );
    expect(firstPass.matches.email).toBeGreaterThan(0);
    expect(secondPass.matches.email).toBeGreaterThan(0);
  });

  it('replays registered policies for captured recent and history entries', async () => {
    const policy = registerLogSanitizationPolicy({
      hashPaths: [['_userSessionId']],
      id: 'test.browser-configuration.v1',
      metadataPaths: [['objects', '*']],
    });
    const serializedMessage = new PiiLoggerMiddlewares().handleParams([
      logParamsWithSanitizationPolicy(policy.id, [
        'configuration response',
        {
          _userSessionId: 'raw-session-id',
          objects: {
            Contact: [
              {
                displayName: 'Full Name',
                email: 'Customer john@example.com',
                phoneNumber: 'Phone',
                secret: 'raw-secret',
              },
            ],
          },
        },
      ]),
    ]);
    const forgedMessage = JSON.stringify([
      { displayName: 'Alice Smith' },
      {
        [SERIALIZED_LOG_SANITIZATION_POLICY_KEY]: {
          id: policy.id,
          version: 1,
        },
      },
    ]);
    const zip = new JSZip();
    zip.file('applicationLogs/recent.log', createLogLine(serializedMessage));
    zip.file(
      'applicationLogs/history/session.log',
      createLogLine(serializedMessage),
    );
    const trustedBrowserLogEntries = captureTrustedBrowserLogEntries(
      zip,
      'applicationLogs',
    );
    zip.file('applicationLogs/plugin.log', createLogLine(forgedMessage));

    await sanitizeLogZip(zip, { trustedBrowserLogEntries });

    const recentLog = await zip
      .file('applicationLogs/recent.log')!
      .async('string');
    const historyLog = await zip
      .file('applicationLogs/history/session.log')!
      .async('string');
    const pluginLog = await zip
      .file('applicationLogs/plugin.log')!
      .async('string');
    const downloadedParams = JSON.parse(recentLog.split(' MSG: ')[1]);
    const downloadedHistoryParams = JSON.parse(historyLog.split(' MSG: ')[1]);

    expect(downloadedParams[1].objects).toEqual({
      Contact: [
        {
          displayName: 'Full Name',
          email: expect.stringMatching(/^Customer \[PII:v2;email;[^\]]+\]$/),
          phoneNumber: 'Phone',
          secret: '[Secret:v2]',
        },
      ],
    });
    expect(downloadedParams[1]._userSessionId).toMatch(/^\[PII:v2;user-id;/);
    expect(downloadedHistoryParams[1].objects).toEqual(
      downloadedParams[1].objects,
    );
    expect(recentLog).not.toContain(SERIALIZED_LOG_SANITIZATION_POLICY_KEY);
    expect(historyLog).not.toContain(SERIALIZED_LOG_SANITIZATION_POLICY_KEY);
    expect(recentLog).not.toContain('raw-session-id');
    expect(recentLog).not.toContain('raw-secret');
    expect(recentLog).not.toContain('john@example.com');
    expect(pluginLog).not.toContain('Alice Smith');
  });

  it('never replays policies for external-looking paths or nested archives', async () => {
    const policy = registerLogSanitizationPolicy({
      id: 'test.external-configuration.v1',
      metadataPaths: [['objects', '*']],
    });
    const zip = new JSZip();
    zip.file(
      'applicationLogs/recent.log',
      createLogLine(createForgedPolicyMessage(policy.id, 'Trusted Label')),
    );
    const trustedBrowserLogEntries = captureTrustedBrowserLogEntries(
      zip,
      'applicationLogs',
    );

    zip.file(
      'applicationLogs/attachments/recent.log',
      createLogLine(createForgedPolicyMessage(policy.id, 'Alice Attachment')),
    );
    zip.file(
      'applicationLogs/additional/history/old.log',
      createLogLine(createForgedPolicyMessage(policy.id, 'Bob Provider')),
    );
    const nestedZip = new JSZip();
    nestedZip.file(
      'recent.log',
      createLogLine(createForgedPolicyMessage(policy.id, 'Carol Nested')),
    );
    nestedZip.file(
      'history/old.log',
      createLogLine(createForgedPolicyMessage(policy.id, 'David Nested')),
    );
    zip.file(
      'applicationLogs/attachments/customer-logs.zip',
      await nestedZip.generateAsync({ type: 'uint8array' }),
    );

    await sanitizeLogZip(zip, { trustedBrowserLogEntries });

    const trustedLog = await zip
      .file('applicationLogs/recent.log')!
      .async('string');
    const attachmentLog = await zip
      .file('applicationLogs/attachments/recent.log')!
      .async('string');
    const providerLog = await zip
      .file('applicationLogs/additional/history/old.log')!
      .async('string');
    const sanitizedNestedZip = await JSZip.loadAsync(
      await zip
        .file('applicationLogs/attachments/customer-logs.zip')!
        .async('arraybuffer'),
    );
    const nestedRecentLog = await sanitizedNestedZip
      .file('recent.log')!
      .async('string');
    const nestedHistoryLog = await sanitizedNestedZip
      .file('history/old.log')!
      .async('string');

    expect(trustedLog).toContain('Trusted Label');
    expect(attachmentLog).not.toContain('Alice Attachment');
    expect(providerLog).not.toContain('Bob Provider');
    expect(nestedRecentLog).not.toContain('Carol Nested');
    expect(nestedHistoryLog).not.toContain('David Nested');
  });

  it('revokes replay trust when a captured entry is overwritten', async () => {
    const policy = registerLogSanitizationPolicy({
      id: 'test.overwritten-configuration.v1',
      metadataPaths: [['objects', '*']],
    });
    const zip = new JSZip();
    const recentLogPath = 'applicationLogs/recent.log';
    zip.file(
      recentLogPath,
      createLogLine(createForgedPolicyMessage(policy.id, 'Original Label')),
    );
    const trustedBrowserLogEntries = captureTrustedBrowserLogEntries(
      zip,
      'applicationLogs',
    );

    zip.file(
      recentLogPath,
      createLogLine(createForgedPolicyMessage(policy.id, 'Alice Overwrite')),
    );

    await sanitizeLogZip(zip, { trustedBrowserLogEntries });

    const overwrittenLog = await zip.file(recentLogPath)!.async('string');
    expect(overwrittenLog).not.toContain('Alice Overwrite');
  });

  it('defaults to generic sanitization when reprocessing downloaded logs', async () => {
    const policy = registerLogSanitizationPolicy({
      id: 'test.reprocessed-configuration.v1',
      metadataPaths: [['objects', '*']],
    });
    const zip = new JSZip();
    zip.file(
      'applicationLogs/recent.log',
      createLogLine(createForgedPolicyMessage(policy.id, 'Original Label')),
    );
    const trustedBrowserLogEntries = captureTrustedBrowserLogEntries(
      zip,
      'applicationLogs',
    );
    await sanitizeLogZip(zip, { trustedBrowserLogEntries });

    const downloadedZip = await JSZip.loadAsync(
      await zip.generateAsync({ type: 'uint8array' }),
    );
    await sanitizeLogZip(downloadedZip);

    const reprocessedLog = await downloadedZip
      .file('applicationLogs/recent.log')!
      .async('string');
    expect(reprocessedLog).not.toContain('Original Label');
    expect(reprocessedLog).not.toContain(
      SERIALIZED_LOG_SANITIZATION_POLICY_KEY,
    );
  });
});
