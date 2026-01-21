import type { StepFunction } from '@ringcentral-integration/test-utils';

import { ClickItemByDataSign } from '../../Common';

/**
 * Click All Calls tab
 * @param props N/A
 * @param context Test runtime context
 */
export const ClickAllCallsTab: StepFunction = async (props, context) => {
  await ClickItemByDataSign({ dataSign: 'All Calls' }, context);
};
