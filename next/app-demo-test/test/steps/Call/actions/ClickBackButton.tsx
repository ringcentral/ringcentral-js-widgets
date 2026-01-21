import { type StepFunction } from '@ringcentral-integration/test-utils';

import { ClickItemByDataSign } from '../../Common';

/**
 * Click back button
 * @param props N/A
 * @param context Test runtime context
 */
export const ClickBackButton: StepFunction = async (props, context) => {
  await ClickItemByDataSign({ dataSign: 'backButton' }, context);
};
