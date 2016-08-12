import Enum from '../../lib/enum';

const definition = {
  flip: 'FLIPPED',
  recording: 'RECORDING',
  holding: 'HOLDING',
  muted: 'MUTED',
  parked: 'PARKED',
  transfered: 'TRANSFERRED',
  forwarded: 'FOWARDED',
};

export default new Enum(definition);
