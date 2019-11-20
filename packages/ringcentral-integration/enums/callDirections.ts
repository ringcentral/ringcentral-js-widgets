import { createHashMap } from '../lib/HashMap';

const callDirection = createHashMap({
  inbound: 'Inbound',
  outbound: 'Outbound',
});

export default callDirection;
