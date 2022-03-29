import url from 'url';

// remove this when dynamic configs has been phased out
const DYNAMIC_CONFIG_DOMAIN = 'https://apps.ringcentral.com';

export const getCSPDomains = (loaderBaseUrl: string) => {
  const { protocol, hostname, port } = url.parse(loaderBaseUrl);
  let domains = `${protocol}//${hostname}${port ? `:${port}` : ''}`;
  if (domains !== DYNAMIC_CONFIG_DOMAIN) {
    domains = `${domains} ${DYNAMIC_CONFIG_DOMAIN}`;
  }
  return domains;
};
