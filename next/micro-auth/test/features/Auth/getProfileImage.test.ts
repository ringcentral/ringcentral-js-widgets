import {
  CONTACT_AVATAR_SIZE_MAP,
  getProfileImage,
} from '../../../src/app/services/Auth/getProfileImage';

describe('getProfileImage', () => {
  const mockProfileImage = {
    uri: 'https://example.com/image',
    etag: 'abc123',
  };

  const mockAccessToken = 'test-token';

  it('should return undefined if accessToken is missing', () => {
    expect(getProfileImage({ profileImage: mockProfileImage })).toBeUndefined();
  });

  it('should return undefined if uri is missing', () => {
    expect(
      getProfileImage({
        profileImage: { ...mockProfileImage, uri: undefined },
        accessToken: mockAccessToken,
      }),
    ).toBeUndefined();
  });

  it('should return undefined if etag is missing', () => {
    expect(
      getProfileImage({
        profileImage: { ...mockProfileImage, etag: undefined },
        accessToken: mockAccessToken,
      }),
    ).toBeUndefined();
  });

  it('should return url with access token and etag', () => {
    const result = getProfileImage({
      profileImage: mockProfileImage,
      accessToken: mockAccessToken,
    });
    expect(result).toBe(
      'https://example.com/image?access_token=test-token&etag=abc123',
    );
  });

  it('should add size to pathname when size is provided', () => {
    const result = getProfileImage({
      profileImage: mockProfileImage,
      accessToken: mockAccessToken,
      size: 'small',
    });
    expect(result).toBe(
      `https://example.com/image/${CONTACT_AVATAR_SIZE_MAP.small}?access_token=test-token&etag=abc123`,
    );
  });

  it('should return undefined when invalid URI is provided', () => {
    expect(
      getProfileImage({
        profileImage: { ...mockProfileImage, uri: 'invalid-url' },
        accessToken: mockAccessToken,
      }),
    ).toBeUndefined();
  });
});
