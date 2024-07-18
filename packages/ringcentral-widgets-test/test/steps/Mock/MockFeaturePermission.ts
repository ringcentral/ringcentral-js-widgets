import type { StepFunction } from '../../lib/step';

import { MockPermission } from './MockPermission';

interface MockFeaturePermissionProps {
  featureId: string;
  available: boolean;
}

export const MockFeaturePermission: StepFunction<
  MockFeaturePermissionProps
> = async ({ featureId, available }, context) => {
  return MockPermission(
    {
      handler: (features) => {
        const featureInfo = features.find(
          (feature) => feature.id === featureId,
        );
        if (!featureInfo) {
          throw new Error(`Not found feature "${featureId}"`);
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
    },
    context,
  );
};
