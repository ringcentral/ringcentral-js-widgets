import { createEnum } from '../../lib/Enum';
import { moduleActionTypes } from '../../enums/moduleActionTypes';

export default createEnum(
  ['alert', 'dismiss', 'dismissAll', 'update'],
  'alert',
  moduleActionTypes,
);
