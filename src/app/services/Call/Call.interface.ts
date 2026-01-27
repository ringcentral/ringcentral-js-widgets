export interface ToNumberMatched {
  entityId: string;
  startTime: string | number;
}

export interface CallOptions {}

export interface Recipient {
  phoneNumber: string;
  id?: string;
  name?: string;
  extension?: string;
  type?: string;
  resourceType?: string;
  freeSolo?: boolean;
}

export interface ConnectOptions<K = any> {
  isConference: boolean;
  phoneNumber?: string | null;
  recipient?: K | null;
  callSettingMode: string;
  isValidNumber: boolean | undefined;
  clickDialerToCall: boolean | undefined;
  contactResourceType: string | null;
}

export type MakeCallParams<K = Recipient> = {
  phoneNumber: string;
  recipient: K;
  fromNumber: string | null;
  isConference?: boolean;
  isValidNumber?: boolean;
  clickDialerToCall?: boolean;
  contactResourceType?: string;
};
