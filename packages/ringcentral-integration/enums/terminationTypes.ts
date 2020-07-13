import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const terminationTypes = ObjectMap.fromObject({
  final: 'final',
  intermediate: 'intermediate',
} as const);

export default terminationTypes;
