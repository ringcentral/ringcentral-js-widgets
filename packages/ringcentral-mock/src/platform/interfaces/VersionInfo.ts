export interface VersionInfo {
  /**
   * Canonical URI of API versions
   */
  uri: string;
  /**
   * Version of the RingCentral REST API
   */
  versionString: string;
  /**
   * Release date of this version
   */
  releaseDate: string;
  /**
   * URI part determining the current version
   */
  uriString: string;
}
