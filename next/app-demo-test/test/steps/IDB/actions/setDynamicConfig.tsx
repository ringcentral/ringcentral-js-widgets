import { Brand } from '@ringcentral-integration/micro-core/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const setDynamicConfig: StepFunction = (props, { app }) => {
  const brand = app.container.got(Brand)!;
  brand.setDynamicConfig({
    ...brand.brandConfig,
    ...props,
  });
};
