import { requeueEvents } from '../../../../enums';

export default {
  [requeueEvents.FAILURE]: 'Call queue transfer fail',
  [requeueEvents.START]: 'Call queue transfer in progress',
  [requeueEvents.SUCCESS]: 'Call queue transfer completed',
};
