/**
 * TODO:
 * * Investigate all references to this entity and unify some of the properties like phone and phoneNumber
 * * Determine the difference between Entity and Contact
 */
export interface Entity {
  id: string;
  name: string;
  type: string;
  phone?: string;
  phoneNumber?: string;
  phoneNumbers?: { phoneNumber: string; phoneType: string; hidden?: boolean }[];
  profileImageUrl?: string;
  jobTitle?: string;
  email?: string;
  hidden?: boolean;
}
