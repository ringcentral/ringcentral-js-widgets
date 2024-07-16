/**
 *
 * @param link URL
 * @returns URL with trailing slash
 * @description App domains defined in BSS doesn't have trailing slash, but the universal link needs to have a trailing slash
 */
import { UrlString } from '@ringcentral-integration/commons/modules/Brand';

export function normalizeUniversalLink(link: UrlString | string) {
  return (link.endsWith('/') ? link : `${link}/`) as `${UrlString}/`;
}
