import Enum from '../../lib/Enum';

export default new Enum([
  'connecting',
  'connected',
  'disconnecting',
  'disconnected',
  'connectFailed',
  'active',
  'idle',
], 'connectionStatus');
