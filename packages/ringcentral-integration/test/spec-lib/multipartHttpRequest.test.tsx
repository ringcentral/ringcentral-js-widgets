import { MultiPartUTF8FormData } from '@ringcentral-integration/utils';

import { multipartHttpRequest } from '../../lib/multipartHttpRequest';

jest.mock('@ringcentral-integration/utils', () => {
  const actual = jest.requireActual('@ringcentral-integration/utils');

  return {
    ...actual,
    isASCII: jest.fn((value: string) =>
      Array.from(value).every((char) => char.charCodeAt(0) < 128),
    ),
    MultiPartUTF8FormData: jest.fn().mockImplementation(() => ({
      getData: jest.fn().mockResolvedValue({
        formData: 'utf8-form-data',
        contentType: 'multipart/form-data; charset=utf-8',
      }),
    })),
  };
});

const createFile = (name: string) => {
  if (!global.File) {
    class TestFile extends Blob {
      name: string;

      constructor(parts: BlobPart[], fileName: string) {
        super(parts);
        this.name = fileName;
      }
    }
    (global as any).File = TestFile;
  }

  return new File(['content'], name);
};

const createPlatform = () => {
  const json = jest.fn().mockResolvedValue({ id: 'direct-response' });
  const multipartJson = jest
    .fn()
    .mockResolvedValue({ id: 'multipart-response' });
  const platform = {
    post: jest.fn().mockResolvedValue({ json }),
    _client: {
      toMultipart: jest.fn().mockResolvedValue([
        {
          json: multipartJson,
        },
      ]),
    },
  };

  return {
    platform,
    mocks: {
      json,
      multipartJson,
    },
  };
};

describe('multipartHttpRequest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('uses platform FormData directly by default even with non-ASCII filenames', async () => {
    const { platform, mocks } = createPlatform();
    const multipart = multipartHttpRequest(platform as any);

    await expect(
      multipart.post('/upload', {
        files: {
          attachment: [createFile('照片.png')],
        },
      }),
    ).resolves.toEqual({ id: 'direct-response' });

    expect(MultiPartUTF8FormData).not.toHaveBeenCalled();
    expect(platform._client.toMultipart).not.toHaveBeenCalled();
    expect(platform.post).toHaveBeenCalledWith(
      '/upload',
      expect.any(FormData),
      undefined,
      {},
    );
    expect(mocks.json).toHaveBeenCalledTimes(1);
  });

  it('uses UTF-8 multipart builder for non-ASCII filenames when opted in', async () => {
    const { platform, mocks } = createPlatform();
    const multipart = multipartHttpRequest(platform as any);

    await expect(
      multipart.post('/upload', {
        files: {
          attachment: [createFile('照片.png')],
        },
        checkAllFilesNameNotHaveASCII: true,
      }),
    ).resolves.toEqual({ id: 'multipart-response' });

    expect(MultiPartUTF8FormData).toHaveBeenCalledWith({
      fields: undefined,
      files: {
        attachment: [expect.any(File)],
      },
    });
    expect(platform.post).toHaveBeenCalledWith(
      '/upload',
      'utf8-form-data',
      undefined,
      {
        headers: {
          'Content-Type': 'multipart/form-data; charset=utf-8',
        },
      },
    );
    expect(platform._client.toMultipart).toHaveBeenCalledTimes(1);
    expect(mocks.multipartJson).toHaveBeenCalledTimes(1);
  });
});
