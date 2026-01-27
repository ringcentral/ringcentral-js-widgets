export function getMemoryUsed() {
  // @ts-ignore
  // chrome, edge only
  const { usedJSHeapSize } = performance?.memory ?? {};
  return usedJSHeapSize;
}
// TODO: move this to config
export const DOMAIN = 'https://andon-collector.intlabs_domain:9090';
export async function fetchHelper(path: string, body: string) {
  const promise = await fetch(`${DOMAIN}/${path}`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await promise.json();
  if (result?.code !== 0) throw Error('Upload operation failed');
  return result;
}
