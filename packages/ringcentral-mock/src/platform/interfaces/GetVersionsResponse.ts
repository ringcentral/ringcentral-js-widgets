import { VersionInfo } from './VersionInfo';

export interface GetVersionsResponse {
  /**
   * Canonical URI of the API version
   */
  uri: string;
  /**
   * Full API version information: uri, number, release date
   */
  apiVersions: VersionInfo[];
  /**
   * Server version
   */
  serverVersion: string;
  /**
   * Server revision
   */
  serverRevision: string;
}
