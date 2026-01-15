/**
 * TODO:
 * * Investigate all references to this entity and unify some of the properties like phone and phoneNumber
 * * Determine the difference between Entity and Contact
 */
export type EntityPhoneNumberItem = {
  phoneNumber: string;
  phoneType: string;
  hidden?: boolean;
};

export interface Entity {
  id: string;
  name: string;
  type: string;
  entityType: string;
  phone?: string;
  phoneNumber?: string;
  phoneNumbers?: EntityPhoneNumberItem[];
  profileImageUrl?: string;
  doNotCall?: boolean;
  jobTitle?: string;
  email?: string;
  hidden?: boolean;
  resourceType?: string;
  isCallQueueNumber?: boolean;
  extensionNumber?: string;
}
