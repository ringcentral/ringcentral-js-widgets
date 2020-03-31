import { createEnum } from '../../lib/Enum';

const AlertLevel = createEnum(['success', 'danger', 'warning', 'info']);

export type AlertLevelType = keyof typeof AlertLevel;

export default AlertLevel;
