import type { LocationStateInfo } from './LocationStateInfo';

export interface LocationInfo {
  /**
   * Canonical URI of a location
   */
  uri: string;
  /**
   * Area code of the location
   */
  areaCode: string;
  /**
   * Official name of the city, belonging to the certain state
   */
  city: string;
  /**
   * Area code of the location (3-digit usually), according to the NANP number format, that can be summarized as NPA-NXX-xxxx and covers Canada, the United States, parts of the Caribbean Sea, and some Atlantic and Pacific islands. See for details North American Numbering Plan
   */
  npa: string;
  /**
   * Central office code of the location, according to the NANP number format, that can be summarized as NPA-NXX-xxxx and covers Canada, the United States, parts of the Caribbean Sea, and some Atlantic and Pacific islands. See for details North American Numbering Plan
   */
  nxx: string;
  /**
   */
  state: LocationStateInfo;
}
