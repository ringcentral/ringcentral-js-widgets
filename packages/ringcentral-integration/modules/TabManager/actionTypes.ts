import { moduleActionTypes } from '../../enums/moduleActionTypes';
import { createEnum } from '../../lib/Enum';

export default createEnum(
  ['mainTabIdChanged', 'event'],
  'tabManager',
  moduleActionTypes,
);
