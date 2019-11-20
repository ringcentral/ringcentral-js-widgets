import Enum from 'ringcentral-integration/lib/Enum';

export default new Enum(
  [
    'networkLoss',
    'offline',
    'serverUnavailable',
    'voipOnly',
    'survival',
    'webphoneUnavailable',
  ],
  'connectivityTypes',
);
