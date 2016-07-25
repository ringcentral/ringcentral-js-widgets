import Enum from '../../lib/enum';
import subscriptionStatus from './subscription-status';


const eventDefinition = {
  message: '/restapi/v1.0/account/~/extension/~/message-store',
  presence: '/restapi/v1.0/account/~/extension/~/presence',
  telephony: '/restapi/v1.0/account/~/extension/~/presence?detailedTelephonyState=true',
  line: '/restapi/v1.0/account/~/extension/~/presence/line',
  linePresence:
    '/restapi/v1.0/account/~/extension/~/presence/line/presence',
  lineTelephony:
    '/restapi/v1.0/account/~/extension/~/presence/line/presence?detailedTelephonyState=true',
  ...subscriptionStatus,
};

export const subscriptionEvents = new Enum(eventDefinition);

const eventTypeDefinition = {
  notification: 'NOTIFICATION',
  statusChanged: 'STATUS_CHANGED',
};

export const subscriptionEventTypes = new Enum(eventTypeDefinition);
