import { requeueEvents } from '../../../../enums';

export default {
  [requeueEvents.FAILURE]: 'Call queue transfer is failed',
  [requeueEvents.START]: 'Call queue transfer in progress',
  [requeueEvents.SUCCESS]: 'Call queue transfer is completed',
};
