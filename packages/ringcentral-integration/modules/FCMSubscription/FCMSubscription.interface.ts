import { FirebaseOptions } from 'firebase/app';
import { RingCentralClient } from '../../lib/RingCentralClient';
import { Auth } from '../Auth';
export interface IFirebaseConfig {
  firebaseConfig: FirebaseOptions;
  vapidKey: string;
  certificateName: string;
}

export interface Deps {
  auth: Auth;
  client: RingCentralClient;
  fCMSubscriptionOptions: IFirebaseConfig;
}

export type TRegistrationToken = string | null;
export type TFCMSubscription = IFCMSubscription | null;
export interface IFCMSubscription {
  uri: string;
  id: string;
  creationTime: string;
  status: string;
  eventFilters: string[];
  expirationTime: string;
  expiresIn: number;
  deliveryMode: {
    transportType: string;
    encryption: boolean;
    registrationId: string;
    certificateName: string;
  };
}
