import { Brand } from '@ringcentral-integration/micro-core/src/app/services';
import { StepFunction } from '@ringcentral-integration/test-utils';

export const WaitBrandConfigReady: StepFunction<{ brandId: string }> = async (
  { brandId },
  { app },
) => {
  const brand = app.container.got(Brand)!;
};
