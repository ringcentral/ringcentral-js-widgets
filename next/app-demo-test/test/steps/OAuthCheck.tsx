import type { SDKConfig } from '@ringcentral-integration/commons/lib/createSdkConfig';
import { OAuth } from '@ringcentral-integration/micro-auth/src/app/services';
import { Locale } from '@ringcentral-integration/micro-core/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface OAuthCheckProps {
  localeId: string;
  brandId: string;
  redirectUri: string;
  usePKCE?: boolean;
  useDiscovery?: boolean;
  clientId?: string;
}

const OAuthCheck: StepFunction<OAuthCheckProps> = async (
  {
    localeId,
    brandId,
    redirectUri,
    usePKCE = false,
    useDiscovery = false,
    clientId,
  },
  { app },
) => {
  const oAuth = app.container.got(OAuth)!;
  const locale = app.container.got(Locale)!;
  await locale.setLocale(localeId);
  const sdkConfig = app.container.got<SDKConfig>('SdkConfig')!;
  const oAuthUri = await oAuth.getOAuthUri();
  const url = new URL(oAuthUri);
  if (usePKCE) {
    expect(url.searchParams.has('code_challenge')).toBeTruthy();
  }
  expect(url.searchParams.has('state')).toBeTruthy();
  expect(
    Array.from(url.searchParams.entries()).filter(
      ([key]) => !['code_challenge', 'state'].includes(key),
    ),
  ).toEqual([
    ['response_type', 'code'],
    ['redirect_uri', redirectUri],
    ['client_id', clientId ?? sdkConfig.clientId],
    ['brand_id', brandId],
    ['display', 'page'],
    ['prompt', ''],
    ['ui_locales', ''],
    ['localeId', localeId],
    ...(useDiscovery ? [['discovery', 'true']] : []),
    ...(usePKCE ? [['code_challenge_method', 'S256']] : []),
    ['force', 'true'],
  ]);
};

export { OAuthCheck };
