import { PhoneNumberModel } from './PhoneNumber.model';
import { PresenceModel } from './Presence.model';
import { Site } from './Site.model';

// TODO: Define the generic contact type
export interface ContactModel {
  name: string;
  type: string;
  status: string;
  phoneNumbers: PhoneNumberModel[];
  emails?: string[];
  presence?: PresenceModel;
  profileImageUrl?: string;
  company?: string;
  jobTitle?: string;
  site?: Site;
}
