// Adjust the import path
import * as UTIF from 'utif';

import {
  getTiffInfo,
  getTiffInfoWithCache,
  tiffInfoCache,
} from '../../src/utils/getTiffInfo';

jest.mock('utif', () => ({
  decode: jest.fn(),
  decodeImage: jest.fn(),
  toRGBA8: jest.fn(),
}));

describe('TIFF Image Processing', () => {
  const mockFetch = jest.fn();
  const mockUrl = 'http://example.com/image.tiff';
  const mockBuffer = new ArrayBuffer(8); // Mock buffer for testing
  const mockIFD = { width: 2, height: 2 }; // Mock IFD data
  const mockRGBA = new Uint8Array([
    255, 0, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255,
  ]); // Mock RGBA data

  beforeAll(() => {
    mockFetch.mockResolvedValue({
      arrayBuffer: jest.fn().mockResolvedValueOnce(mockBuffer),
    });
    global.fetch = mockFetch;
    jest.mocked(UTIF.decode).mockReturnValue([mockIFD] as any); // Mock decode to return our IFD
    jest.mocked(UTIF.toRGBA8).mockReturnValue(mockRGBA); // Mock RGBA conversion
  });

  afterEach(() => {
    jest.clearAllMocks();
    tiffInfoCache.cache.clear?.();
  });

  test('getTiffInfo should fetch and decode TIFF image successfully', async () => {
    const result = await getTiffInfo(mockUrl);

    expect(mockFetch).toHaveBeenCalledWith(mockUrl);
    expect(result).toEqual({
      width: mockIFD.width,
      height: mockIFD.height,
      rgba: mockRGBA,
    });
    expect(UTIF.decode).toHaveBeenCalledWith(mockBuffer);
    expect(UTIF.decodeImage).toHaveBeenCalledWith(mockBuffer, mockIFD);
    expect(UTIF.toRGBA8).toHaveBeenCalledWith(mockIFD);
  });

  test('getTiffInfo should throw an error for invalid RGBA length', async () => {
    jest.mocked(UTIF.toRGBA8).mockReturnValue(new Uint8Array([255])); // Mock invalid RGBA length

    await expect(getTiffInfo(mockUrl)).rejects.toThrow(
      'Invalid RGBA data length: expected 16, got 1',
    );
  });

  test('getTiffInfoWithCache should call getTiffInfo and handle errors', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await getTiffInfoWithCache(mockUrl);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error loading or rendering TIFF:',
      expect.any(Error),
    );

    consoleErrorSpy.mockRestore();
  });

  test('getTiffInfoWithCache should cache results', async () => {
    const result = await getTiffInfoWithCache(mockUrl);

    // Call again to check if it uses cache
    const cachedResult = await getTiffInfoWithCache(mockUrl);

    expect(result).toEqual(cachedResult);
    expect(mockFetch).toHaveBeenCalledTimes(1); // Should only call fetch once
  });
});
