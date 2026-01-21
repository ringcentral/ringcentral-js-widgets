export interface Contact {
  id: string;
  type: string;
  name: string;

  url: string;

  phones: PhoneNumber[];
  customFields: Record<string, string | boolean>;
}

export interface PhoneNumber {
  number: string;
  type: string;
}

export interface TypeObject {
  name: string;
  values: string[];
}
export interface ContactSearchResponse {
  records: Contact[];
}
