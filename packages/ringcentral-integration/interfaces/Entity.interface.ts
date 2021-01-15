export interface Entity {
  id: string;
  name: string;
  type: string;
  phone?: string;
  phoneNumbers?: { phoneNumber: string; phoneType: string }[];
}
