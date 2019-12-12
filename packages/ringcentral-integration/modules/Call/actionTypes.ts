import { createEnum } from '../../lib/Enum';
import { moduleActionTypes } from '../../enums/moduleActionTypes';

export default createEnum(
  [
    ...Object.keys(moduleActionTypes),
    'toNumberChanged',
    'toNumberMatched',
    'cleanToNumberEntities',
    'updateFromNumber',
    'connect',
    'connectSuccess',
    'connectError',
  ],
  'callActionTypes',
);
