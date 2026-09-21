import { StepFunction } from '@ringcentral-integration/test-utils';
import JSZip from 'jszip';

interface MockCPRCallProps {
  onResponse?: (payload: { reportJson: any; zipBuffer: Buffer }) => void;
  status?: number;
}

export const MockCPRCall: StepFunction<MockCPRCallProps> = (
  { onResponse, status = 200 },
  { rcMock },
) => {
  rcMock.defaultInitMocks.add(() => {
    rcMock.fetchMock.mock(
      /\/restapi\/v1\.0\/client-info\/edr-info\?channelId=problemReports$/,
      200,
      {
        method: 'GET',
        response: () => ({
          body: {
            cprUri: 'https://cpr-sharedlabs_domain',
            token: 'mocked-cpr-token',
          },
        }),
      },
    );

    if (status >= 400) {
      rcMock.fetchMock.mock(
        /\/cpr-api\/v1\/problem-reports$/,
        { status, body: { error: 'submit failed' } },
        { method: 'POST' },
      );
      return;
    }

    rcMock.fetchMock.mock(/\/cpr-api\/v1\/problem-reports$/, status, {
      method: 'POST',
      response: async (_url, opts) => {
        const form = opts.body as FormData;

        const reportFile = form.get('problemReportRequest') as File;
        const symKey = Reflect.ownKeys(reportFile)[0];
        const reportJson = JSON.parse(
          (reportFile as any)[symKey]._buffer.toString('utf8'),
        );

        const zipFile = form.get('attachments') as File;
        const zipSymKey = Reflect.ownKeys(zipFile)[0];
        const zipBuffer = (zipFile as any)[zipSymKey]._buffer;

        onResponse?.({ reportJson, zipBuffer });

        return {
          body: {
            id: 'fake-id',
            ...reportJson,
            attachments: [{ fileName: 'applicationLogs.zip' }],
          },
        };
      },
    });
  });
};

export async function buildZip(
  extraFiles: { fileName: string; bytes: ArrayBuffer }[] = [],
): Promise<Blob> {
  const zip = new JSZip();
  zip.file('applicationLogs/recent.log', 'recent log placeholder');
  const attach = zip.folder('applicationLogs/attachments')!;
  for (const f of extraFiles) {
    attach.file(f.fileName, new Uint8Array(f.bytes));
  }
  const buf = await zip.generateAsync({ type: 'blob' });
  return new Blob([buf], { type: 'application/zip' });
}
