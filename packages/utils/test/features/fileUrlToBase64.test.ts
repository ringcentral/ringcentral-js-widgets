import { fileToBase64 } from '../../src/utils/base64Handler';
import { fileUrlToBase64 } from '../../src/utils/fileUrlToBase64';

jest.mock('../../src/utils/base64Handler', () => ({
  fileToBase64: jest.fn().mockImplementation((url) => {
    return `base64-string-${url}`;
  }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

global.fetch = (async (url: string) => {
  return { blob: () => url };
}) as any;
describe('fileUrlToBase64', () => {
  it('should return the cached base64 string if force is false and cache exists', async () => {
    const c2dLogo = 'https://example.com/logo.png';

    expect(await fileUrlToBase64(c2dLogo)).toBe(`base64-string-${c2dLogo}`);
    expect(fileToBase64).toHaveBeenCalledTimes(1);

    expect(await fileUrlToBase64(c2dLogo)).toBe(`base64-string-${c2dLogo}`);
    expect(fileToBase64).toHaveBeenCalledTimes(1);

    expect(await fileUrlToBase64(c2dLogo, true)).toBe(
      `base64-string-${c2dLogo}`,
    );
    expect(fileToBase64).toHaveBeenCalledTimes(2);
  });

  it('when get same url during fetching, should reuse same promise', async () => {
    const c2dLogo = 'https://example.com/logo2.png';

    const promises = [
      fileUrlToBase64(c2dLogo),
      fileUrlToBase64(c2dLogo),
      fileUrlToBase64(c2dLogo),
      fileUrlToBase64(c2dLogo),
      fileUrlToBase64(c2dLogo),
    ];

    await Promise.all(promises);

    expect(fileToBase64).toHaveBeenCalledTimes(1);
  });

  it('when api fail, should accept outside can that again', async () => {
    const c2dLogo = 'https://example.com/logo3.png';

    jest.mocked(fileToBase64).mockImplementationOnce(() => {
      throw new Error('fetch failed');
    });

    await Promise.allSettled([fileUrlToBase64(c2dLogo)]);
    const result = await fileUrlToBase64(c2dLogo);
    expect(result).toBe(`base64-string-${c2dLogo}`);

    expect(fileToBase64).toHaveBeenCalledTimes(2);
  });
});
