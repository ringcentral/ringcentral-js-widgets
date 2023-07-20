import { URL } from 'url';
import type { StepFunction } from '../lib/step';

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
    usePKCE = true,
    useDiscovery = false,
    clientId,
  },
  { phone },
) => {
  const oAuthUri = phone.oAuth.oAuthUri;
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
    ['client_id', clientId ?? 'test key'],
    ['brand_id', brandId],
    ['display', 'page'],
    ['prompt', ''],
    ['ui_options', 'hide_remember_me'],
    ['ui_options', 'hide_tos'],
    ['ui_locales', ''],
    ['localeId', localeId],
    ...(useDiscovery ? [['discovery', 'true']] : []),
    ...(usePKCE ? [['code_challenge_method', 'S256']] : []),
    ['force', 'true'],
  ]);
};

export { OAuthCheck };
