import Enum from 'ringcentral-integration/lib/Enum';
import moduleActionTypes from 'ringcentral-integration/enums/moduleActionTypes';
import proxyActionTypes from 'ringcentral-integration/enums/proxyActionTypes';

export default new Enum([
  ...Object.keys(moduleActionTypes),
  ...Object.keys(proxyActionTypes),
  'syncClosed',
  'syncMinimized',
  'syncSize',
  'syncFocus',
  'syncPosition',
  'showAdapter',
], 'adapterModuleCore');
