import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

const AlertLevel = ObjectMap.fromKeys(['success', 'danger', 'warning', 'info']);

export type AlertLevelType = keyof typeof AlertLevel;

export default AlertLevel;
