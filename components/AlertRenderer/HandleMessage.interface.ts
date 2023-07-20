import type { AlertItem } from '@ringcentral-integration/commons/modules/Alert';

export interface HandleMessage {
  handleMessage: (message: AlertItem) => boolean;
}
