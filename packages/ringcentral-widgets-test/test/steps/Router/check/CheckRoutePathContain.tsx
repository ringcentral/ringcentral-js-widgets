import { waitUntilTo } from '@ringcentral-integration/utils';

import type { StepFunction } from '../../../lib/step';

export const CheckRoutePathContain: StepFunction<{ path: string }> = async (
  { path },
  { phone },
) => {
  await waitUntilTo(() =>
    expect(phone.routerInteraction.currentPath).toContain(path),
  );
};
