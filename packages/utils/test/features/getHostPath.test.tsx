import { getHostPath } from '../../src/utils/getHostPath';

describe('getHostPath', () => {
  it.each([
    [
      'https://www.example.com/path/to/page',
      'https://www.example.com/path/to/',
    ],
    [
      'https://www.example.com/path/to/index.html',
      'https://www.example.com/path/to/',
    ],
    [
      'https://www.example.com/path/to/index.html?example=true',
      'https://www.example.com/path/to/',
    ],
    [
      'https://www.example.com/path/to/index.html#exampleURL',
      'https://www.example.com/path/to/',
    ],
    [
      'https://www.example.com/path/to/index.html?phone=123#exampleURL',
      'https://www.example.com/path/to/',
    ],
  ])('should return the host URL', (mockHref, expectedHostUrl) => {
    const result = getHostPath(mockHref);
    expect(result).toBe(expectedHostUrl);
  });
});
