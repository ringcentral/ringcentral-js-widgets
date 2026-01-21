import type { StepFunction } from '@ringcentral-integration/test-utils';

import { MockPermission } from './MockPermission';

interface MockFeaturePermissionProps {
  featureId: string;
  available: boolean;
  isDefaultInit?: boolean;
}

export const MockFeaturePermission: StepFunction<
  MockFeaturePermissionProps
> = async ({ featureId, available, isDefaultInit = false }, context) => {
  return MockPermission(
    {
      handler: (features) => {
        const featureInfo = features.find(
          (feature) => feature.id === featureId,
        );
        if (!featureInfo) {
          console.warn(`Not found feature "${featureId}"`);
        }
        return features
          .filter((feature) => feature.id !== featureId)
          .concat([
            {
              ...featureInfo,
              id: featureId,
              available,
            },
          ]);
      },
      isDefaultInit,
    },
    context,
  );
};
