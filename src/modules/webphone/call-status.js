import KeyValueMap from 'data-types/key-value-map';

const definition = {
  flip: 'FLIPPED',
  recording: 'RECORDING',
  holding: 'HOLDING',
  muted: 'MUTED',
  parked: 'PARKED',
  transfered: 'TRANSFERRED',
  forwarded: 'FOWARDED',
};

export default new KeyValueMap(definition);
