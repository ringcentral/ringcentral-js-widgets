import { AlertItem } from '@ringcentral-integration/commons/modules/AlertV2';

export interface HandleMessage {
  handleMessage: (message: AlertItem) => boolean;
}
