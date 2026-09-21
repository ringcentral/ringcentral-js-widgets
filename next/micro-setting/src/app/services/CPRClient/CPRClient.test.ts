import type { SanitizedLogArchive } from '@ringcentral-integration/micro-core/src/app/services';

import { CPRClient } from './CPRClient';
import type { CPRClientOptions, FileMeta } from './CPRClient.interface';

const createCPRClient = ({
  archive,
  cPRClientOptions,
}: {
  archive?: SanitizedLogArchive;
  cPRClientOptions?: CPRClientOptions;
}) => {
  const client = Object.create(CPRClient.prototype) as CPRClient;
  const collectSanitizedLogs = jest.fn().mockResolvedValue(archive);

  Object.defineProperties(client, {
    _browserLogger: {
      value: { collectSanitizedLogs },
    },
    _cPRClientOptions: {
      value: cPRClientOptions,
    },
    logger: {
      value: {
        error: jest.fn(),
        warn: jest.fn(),
      },
    },
  });

  return { client, collectSanitizedLogs };
};

const createArchive = (): SanitizedLogArchive => ({
  content: new Blob(['log archive']),
  name: 'applicationLogs_2026-08-05',
});

const createExtraFile = (): FileMeta => ({
  base64Url: 'data:text/plain;base64,bG9n',
  id: 'attachment-1',
  name: 'recent.log',
  size: 3,
});

describe('CPRClient', () => {
  describe('collectAndZipCPRLogs', () => {
    it('delegates log collection to BrowserLogger with the requested scope and attachments', async () => {
      const archive = createArchive();
      const extraFile = createExtraFile();
      const { client, collectSanitizedLogs } = createCPRClient({ archive });

      const result = await client.collectAndZipCPRLogs({
        extraFiles: [extraFile],
        scope: ['jupiter'],
      });

      expect(collectSanitizedLogs).toHaveBeenCalledWith({
        extraFiles: [extraFile],
        scope: ['jupiter'],
      });
      expect(result?.content).toBe(archive.content);
    });

    it('names the archive with the default CPR logs filename', async () => {
      const { client } = createCPRClient({ archive: createArchive() });

      const result = await client.collectAndZipCPRLogs({ extraFiles: [] });

      expect(result?.name).toBe('applicationLogs.zip');
    });

    it('names the archive with the configured CPR logs filename', async () => {
      const { client } = createCPRClient({
        archive: createArchive(),
        cPRClientOptions: { logsFilename: 'msTeamsLogs.zip' },
      });

      const result = await client.collectAndZipCPRLogs({ extraFiles: [] });

      expect(result?.name).toBe('msTeamsLogs.zip');
    });

    it('returns undefined when BrowserLogger cannot build an archive', async () => {
      const { client } = createCPRClient({ archive: undefined });

      const result = await client.collectAndZipCPRLogs({ extraFiles: [] });

      expect(result).toBeUndefined();
    });
  });
});
