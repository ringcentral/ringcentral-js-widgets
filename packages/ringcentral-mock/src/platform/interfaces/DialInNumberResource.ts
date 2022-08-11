import { MeetingsCountryResource } from './MeetingsCountryResource';

export interface DialInNumberResource {
  /**
   */
  phoneNumber: string;
  /**
   */
  formattedNumber: string;
  /**
   */
  location: string;
  /**
   */
  country: MeetingsCountryResource;
}
