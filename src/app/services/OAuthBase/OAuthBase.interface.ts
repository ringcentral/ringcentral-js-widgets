import type { LoginUrlOptions } from '@ringcentral/sdk';

export interface OAuthBaseOptions
  extends Pick<LoginUrlOptions, 'redirectUri' | 'uiOptions'> {
  showCustomToast?: (msg: string, desc: string) => boolean;
}
