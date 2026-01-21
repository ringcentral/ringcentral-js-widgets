// write test for node module url.resolve
import { parse, resolve, format } from 'url';

describe('node module url migration', () => {
  it('should resolve relative path', () => {
    const base = 'https://one/two/three';
    const url = 'four';
    const href = new URL(url, base).href;
    expect(resolve(base, url)).toBe(href);
    expect(href).toBe('https://one/two/four');
  });

  it('should resolve absolute path', () => {
    const sourceUrl = 'https://one/two/three';
    const { protocol, host, href } = parse(sourceUrl);

    expect(`${protocol}//${host}`).toBe(new URL(sourceUrl).origin);
    expect(href).toBe(sourceUrl);
  });

  it('should resolve absolute path 2', () => {
    const oAuthUri = 'http://one/two/three?a=100&b=200&state=300';

    const { query, ...parsedUri } = parse(oAuthUri, true);
    const uuid = '123';
    const uri = format({
      ...parsedUri,
      query: {
        ...query,
        state: `${query.state}-${uuid}`,
      },
      search: undefined,
    });

    const newURL = new URL(oAuthUri);

    newURL.searchParams.set(
      'state',
      `${newURL.searchParams.get('state')}-${uuid}`,
    );

    expect(uri).toBe(newURL.href);
  });
});
