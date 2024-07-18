import Client from '@ringcentral/sdk/lib/http/Client';
import type Platform from '@ringcentral/sdk/lib/platform/Platform';
import * as uuid from 'uuid';

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
  const boundary = `Boundary_${uuid.v4()}`;
  const options: Options = { headers: {} };
  options.headers[
    Client._contentType
  ] = `${Client._multipartContentType}; boundary=${boundary}`;
  let _body = body.reduce<string>((data, item) => {
    data += `--${boundary}\r\n`;
    data += `${Client._contentType}: ${Client._jsonContentType}\r\n\r\n`;
    data += `${JSON.stringify(item.body)}\r\n`;
    return data;
  }, '');
  _body += `--${boundary}--`;
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
  const boundary = `Boundary_${uuid.v4()}`;
  const options: Options = { headers: {} };
  options.headers[
    Client._contentType
  ] = `${Client._multipartContentType}; boundary=${boundary}`;
  const result = await platform.get(url, query, options);
  // TODO: fix modifier issue about SDK.
  return (platform as any)._client.toMultipart(result);
}
