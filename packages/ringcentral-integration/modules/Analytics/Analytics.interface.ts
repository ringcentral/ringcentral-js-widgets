export interface TrackProps {
  appName: string;
  appVersion: string;
  brand: string;
  'App Language': string;
  'Browser Language': string;
  'Extension Type': string;
  'App Init Time': number;
  id?: string;
}

export interface TrackTarget {
  eventPostfix: string;
  router: string;
}

export interface TrackPayload {
  pathname: string;
}

export interface TrackAction {
  type: string;
  payload?: TrackPayload;
  curIdx?: number;
  playing?: boolean;
  fromType?: string;
  callSettingMode?: string;
  phoneNumber?: string;
  recipient?: any;
}

export interface TrackLog {
  timeStamp: string;
  event: string;
  trackProps: TrackProps;
}

export interface TrackImpl {
  (action: TrackAction): void;
}

export interface TrackItem {
  tagName: string;
  funcName: string;
  funcImpl: TrackImpl;
}

export interface PendoAgent {
  visitor: {
    id: string;
    appName: string;
    appVersion: string;
    appBrand: string;
    plaBrand: string;
    countryCode: string;
    [key: string]: string;
  };
  account: {
    id: string;
    [key: string]: string;
  };
}

export interface IdentifyOptions {
  userId: string;
  [K: string]: any;
}
