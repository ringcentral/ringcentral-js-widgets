import Enum from 'ringcentral-integration/lib/Enum';
import baseActionTypes from '../../lib/OAuthBase/baseActionTypes';

export default new Enum([
  ...Object.keys(baseActionTypes),
  'setupProxy',
  'proxyRetry',
], 'proxyFrameOAuth');
