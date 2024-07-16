// remove this when dynamic configs has been phased out
export const getCSPDomains = (loaderBaseUrl?: string) => {
  const domains = new Set<string>();
  if (loaderBaseUrl) {
    const urlObj = new URL(loaderBaseUrl);
    domains.add(urlObj.origin);
  }
  domains.add('https://apps.ringcentral.com');
  return Array.from(domains).join(' ');
};
