import * as uuid from 'uuid';

import Client from '@ringcentral/sdk/lib/http/Client';
import Platform from '@ringcentral/sdk/lib/platform/Platform';

interface Options {
  headers: Record<string, string>;
}

export async function batchPutApi({
  platform,
  url,
  query,
  body,
}: {
  platform: Platform;
  url: string;
  query?: Record<string, any>;
  body: any[];
}) {
  const boundry = `Boundary_${uuid.v4()}`;
  const options: Options = { headers: {} };
  options.headers[
    Client._contentType
  ] = `${Client._multipartContentType}; boundary=${boundry}`;
  let _body = body.reduce<string>((data, item) => {
    data += `--${boundry}\r\n`;
    data += `${Client._contentType}: ${Client._jsonContentType}\r\n\r\n`;
    data += `${JSON.stringify(item.body)}\r\n`;
    return data;
  }, '');
  _body += `--${boundry}--`;
  const result = await platform.put(url, _body, query, options);
  // TODO: fix modifier issue about SDK.
  return (platform as any)._client.toMultipart(result);
}

export async function batchGetApi({
  platform,
  url,
  query,
}: {
  platform: Platform;
  url: string;
  query?: Record<string, any>;
}) {
  const boundry = `Boundary_${uuid.v4()}`;
  const options: Options = { headers: {} };
  options.headers[
    Client._contentType
  ] = `${Client._multipartContentType}; boundary=${boundry}`;
  const result = await platform.get(url, query, options);
  // TODO: fix modifier issue about SDK.
  return (platform as any)._client.toMultipart(result);
}
