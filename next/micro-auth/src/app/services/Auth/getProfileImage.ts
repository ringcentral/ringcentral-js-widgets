import type AccountDirectoryProfileImageResource from '@rc-ex/core/lib/definitions/AccountDirectoryProfileImageResource';
import type { ContactAvatarSize } from '@ringcentral-integration/commons/interfaces/Contact.model';

export const CONTACT_AVATAR_SIZE_MAP = {
  xsmall: '90x90',
  small: '195x195',
  large: '584x584',
  original: 'original',
} as const;

type GetProfileImageOptions = {
  profileImage: AccountDirectoryProfileImageResource;
  accessToken?: string;
  size?: ContactAvatarSize;
};

export const getProfileImage = ({
  profileImage,
  accessToken,
  size,
}: GetProfileImageOptions) => {
  const uri = profileImage?.uri;
  const etag = profileImage.etag;

  if (
    !accessToken ||
    !uri ||
    // in platform must have etag means that the image is valid and exist, not have may not have image due to the backend sync image issue
    !etag
  )
    return undefined;

  try {
    const url = new URL(uri);

    // add size to pathname
    if (size) {
      url.pathname = `${url.pathname}/${CONTACT_AVATAR_SIZE_MAP[size]}`;
    }

    url.searchParams.append('access_token', accessToken);
    url.searchParams.append('etag', etag);

    return url.toString();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`[getProfileImage] getProfileImageSync error`);

    return undefined;
  }
};
