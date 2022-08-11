export interface GetVersionResponse {
  /**
   * Canonical URI of the version info resource
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
