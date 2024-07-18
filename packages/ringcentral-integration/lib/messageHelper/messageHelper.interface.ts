export interface Correspondent {
  phoneNumber?: string;
  extensionNumber?: string;
  name?: string;
}

export interface VoicemailAttachment {
  duration?: number;
  uri?: string;
}

export interface FaxAttachment {
  uri?: string;
}

export interface SortEntity {
  matchOrder?: number;
  creationTime?: number;
}
